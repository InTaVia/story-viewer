|<template>

    <section class="estimation"
                v-if="quiz"
                :id="`quiz-id-${quizId}`"
                :class="[{'quiz-was-answered' : quizWasSubmitted},
                {'quiz-review' : quizReview}]">

        <h3 class="quiz-question">{{quiz.question_title}}</h3>

        <div class="estimation-wrapper disable-pointer-events" :class="[calculatedPoints > 0 ? 'answered-correct' : 'answered-wrong']">
            <div class="estimation-slider">
                <div class="estimation-input-bg"></div>
                <input ref="value" type="range" name="estimation" :min="min" :max="max" :step="step" v-model="value" @change="showSubmitAnswerBtn = true" />

                <output class="estimation-answer" :style="{left : calcAnswerPosiiton + '%'}">
                    <div class="estimation-knob"></div>
                    <span>{{value}}</span>
                </output>

                <div class="correct-answer" :style="{left : correctAnswerPosition + '%'}" v-if="quizWasSubmitted || quizReview">
                    <div class="correct-answer-icon"></div>
                    <span>{{correctAnswer}}</span>
                </div>
            </div>

            <div class="min-max-numbers">
                <span>{{min}}</span>
                <span>{{max}}</span>
            </div>
        </div>


        <teleport :to="isTeleported.toElement" :disabled="isTeleported.disabled" v-if="isMounted">
            <button class="quiz-submit-btn" @click="submitAnswer" v-if="showSubmitAnswerBtn && quizWasSubmitted == false">{{getTranslation('answer')}}</button>
        </teleport>

        <teleport :to="isTeleported.toElement" :disabled="isTeleported.disabled" v-if="isMounted">
            <button class="quiz-submit-btn" @click="openExtendedSolution" v-if="quizWasSubmitted == true && showExtendedSolutionBtn">{{getTranslation('extended_solution')}}</button>
        </teleport>

        <teleport :to="isTeleported.toElement" :disabled="isTeleported.disabled" v-if="isMounted">
            <button class="quiz-submit-btn" @click="endQuizItem" v-if="showEndQuizBtn">{{getTranslation('continue')}}</button>
        </teleport>

        <extended-solution v-if="extendedSolutionActive" :quiz-id="quizId" :extended-solution="extendedSolution" :show-end-quiz-item-button="showEndQuizItemButton" @end-quiz-item="endQuizItem"></extended-solution>

    </section>
    
</template>



<script>

    import find from 'lodash/find';
    import cloneDeep from 'lodash/cloneDeep';
    import has from 'lodash/has';
    import isEqual from 'lodash/isEqual';


    import ExtendedSolution from './QuizExtendedSolution.vue';

    // expecting DB JSON DATA like:
    // {
    // 	"estimation": [
    // 		{
    // 			"max": "75",
    // 			"min": "10",
    // 			"correct": "35",
    //          "step": "1" // optional
    // 		}
    // 	 ]
    // }

    export default {
        props: {
            quizId : {
                type: String,
                default: ""
            },
            showQuizReview: {
                type: Boolean,
                default: true
            },
            saveDataInVisitorState: {
                type: Boolean,
                default: true
            },
            showExtendedSolution: {
                type: Boolean,
                default: true
            },
            showEndQuizItemButton: {
                type: Boolean,
                default: true
            },
            isTeleported: {
                type: Object,
                default: {
                    toElement: "#app-container",
                    disabled: true
                }
            }
        },
        emits: ['endQuizItem'],
        data() {
            return {
                isMounted: false,

                quiz: undefined,
                quizAnswers: undefined,
                quizContent: undefined,
                quizPoints: 0,
                extendedSolution: undefined,
                keyIds: [],
                
                value: 0,
                min: 0,
                max: 0,
                step: 0,
                correctAnswer: undefined,
                correctAnswerPosition: 0,
                numberIsDecimal: false,

                selectedAnswer: undefined,
                calculatedPoints: 0,
                
                quizWasSubmitted: false,
                showSubmitAnswerBtn: false,
                showExtendedSolutionBtn: false,
                extendedSolutionActive: false,
                showEndQuizBtn: false
            };
        },
        components: {
            ExtendedSolution
        },
        created(){
            const vm = this;
            this.quiz = cloneDeep( find(fg.content.quiz[fg.state.visitor.languageId], function(quiz) { return vm.quizId == quiz.root_item_id } ) );

            // extract quizAnswers, quizContent, quizExtendedSolution and quizPoints
            if( this.quiz !== undefined ){
                
                this.parseQuizData();

                // init statement values
                this.min = this.quizAnswers.min * 1;
                this.max = this.quizAnswers.max * 1;

                // init step
                if(this.quizAnswers.step) this.step = this.quizAnswers.step * 1;
                else this.step = 1;
                
                // init corect answer position
                this.correctAnswer = this.quizAnswers.correct;
                let span = this.max - this.min;
                let point = this.correctAnswer - this.min;
                this.correctAnswerPosition = point / span * 100;
            }

        },
        mounted(){
            this.isMounted = true;
        },
        computed: {
            calcAnswerPosiiton: function() {
                const vm = this;
                let span = vm.max - vm.min;
                let point = vm.value - vm.min;
                let percent = point / span * 100;

                return percent;
            },
            quizReview: function(){
                let quizReview = false;

                // CASE: if quiz review is true and save visitor data in state is true
                if(this.showQuizReview == true && this.saveDataInVisitorState == true){
                    let solvedQuiz = fg.state.visitor.quiz[this.quizId];
                    // quiz was answered and there is quiz value saved in visitor state
                    if(solvedQuiz) {
                        this.value = solvedQuiz.selectedAnswer;
                        this.calculatedPoints = solvedQuiz.quizPoints;
                        quizReview = true;
                    } else {
                        // init the default state of value
                        this.calcValue();
                    }
                } else {
                    // init the default state of value
                    this.calcValue();
                }
                return quizReview;
            }
        },
        methods: {
            parseQuizData: function(){
                const vm = this;

                // Quiz Answers Estimation
                let quizAnswers = JSON.parse(vm.quiz.quiz_answers).estimation[0];
                if(quizAnswers) this.quizAnswers = quizAnswers;

                // Quiz Content
                let quizContent = JSON.parse(vm.quiz.quiz_content);
                if(quizContent) this.quizContent = quizContent[0];
                
                // Quiz Points
                if( vm.quiz.quiz_points > 0 ) this.quizPoints = vm.quiz.quiz_points;

                // Quiz Extended Solution
                let extendedSolution = JSON.parse(vm.quiz.quiz_content_extended_solution);
                if(extendedSolution) this.extendedSolution = extendedSolution[0];
            },
            calcValue: function(){
                // check if to show / don't show decimal values
                if(this.min % 1 != 0 || this.max % 1 != 0) this.numberIsDecimal = true;

                if(this.numberIsDecimal) this.value = (this.min + this.max) / 2;
                else {
                    this.value = Math.round( (this.min + this.max) / 2);
                    this.step = Math.round(this.step);
                }
            },
            submitAnswer: function(){
                this.quizWasSubmitted = true;
                this.calculateQuestionPoints();
            },
            calculateQuestionPoints: function(){
                const vm = this;
                let diffPercent = 0;

                // get the whole range of estimation
                let estimationRange = parseInt(this.max) - parseInt(this.min);
                //calc the difference bewtween user answer and correct_answer 
                let difference = Math.abs(parseFloat(this.value) - parseFloat(this.correctAnswer));

                // when there is no difference, user is 100% correct 
                if(difference == 0) diffPercent = 100;
                else diffPercent = 100 - (100 / estimationRange) * difference * 2;

                
                // calculate points
                // no points if answer too far away
                if (diffPercent < 50) vm.calculatedPoints = 0;
                // calculate points - if answer is +/- 25%
                else {
                    let estimationRangeHalf = estimationRange * 0.5;
                    let differencePercent = 100 - (100 / estimationRangeHalf) * difference * 2;
                    vm.calculatedPoints = Math.round(this.quizPoints / 100 * differencePercent); // Points. exact = 100% points; 25% +/- = 0% points
                }

                //save visitor data
                if(this.saveDataInVisitorState == true) this.saveVisitorData();

                // show extended solution or end quiz btn
                if (this.extendedSolution && this.showExtendedSolution) {
                    this.showExtendedSolutionBtn = true;
                    // show extended solution and finish quiz at the same time if there is no end quiz button
                    if(!this.showEndQuizItemButton) this.endQuizItem();
                }
                else if(this.showEndQuizItemButton) this.showEndQuizBtn = true;
                else this.endQuizItem();

            },
            saveVisitorData: function(){
                if (fg.state.visitor.quiz == undefined) fg.state.visitor.quiz = {};

                let visitorData = { 'quizId' : this.quiz.root_item_id, 'quizPoints': this.calculatedPoints, 'selectedAnswer': this.value };
                fg.state.visitor.quiz[this.quiz.root_item_id] = visitorData;
            },
            openExtendedSolution: function(){
                this.showExtendedSolutionBtn = false;
                this.extendedSolutionActive = true;
            },
            endQuizItem: function(){
                // trigger custom event - "quiz end"
                let quizId = this.quizId;
                this.showEndQuizBtn = false;
                this.$emit('endQuizItem', { quizId });

                // optional -> hide extended solution
                // this.extendedSolutionActive = false;
            }
        }


    }
</script>


<style lang="less">


</style>