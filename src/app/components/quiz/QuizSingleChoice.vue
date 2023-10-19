<template>
    
    <section class="single-choice"
        v-if="quiz"
        :id="`quiz-id-${quizId}`"
        :class="[{'quiz-was-answered' : quizWasSubmitted},
                 {'quiz-review' : quizReview}]">

        <h3 class="quiz-question">{{quiz.question_title}}</h3>

        <button v-for="(answer, index) in quizAnswers"
            class="sc-answer disable-pointer-events"
            @click="selectAnswer(answer)"
            :key="keyIds[index]"
            :class="[{'is-image' : isImage(answer) },
                    {'selected' : isSelected(answer) },
                    answer.is_correct == 1 ? 'correct' : 'wrong']">

                <img v-if="isImage(answer)" :src="fileURL(answer.image_question[0].url)" alt="" />
                <label v-else>{{answer.text_question}}</label>

        </button>


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
    import forEach from 'lodash/forEach';
    import cloneDeep from 'lodash/cloneDeep';
    import uniqueId from 'lodash/uniqueId';
    import has from 'lodash/has';
    import isEqual from 'lodash/isEqual';


    import ExtendedSolution from './QuizExtendedSolution.vue';

    // expecting DB JSON DATA like:
    // {
    //     "singlechoice": [
    //         {
    //             "is_correct": "",
    //             "text_question": "Starnberger See",
    //             "image_question": []
    //         },
    //         {
    //             "is_correct": "1",
    //             "text_question": "Bodensee",
    //             "image_question": []
    //         }
    //     ]
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

                correctAnswer: undefined,
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
                // Find Correct Answer
                this.correctAnswer = find(vm.quizAnswers, function(answer) { return answer.is_correct == 1; });

                // Create unique key ids for vue v-for loop
                forEach(vm.quizAnswers, function(answer){
                    vm.keyIds.push("sc-" + uniqueId());     
                });
            }
        },
        mounted(){
            this.isMounted = true;
        },
        computed: {
            quizReview: function(){
                let quizReview = false;
                if(this.showQuizReview == true && this.saveDataInVisitorState == true){
                    let solvedQuiz = fg.state.visitor.quiz[this.quizId];
                    if(solvedQuiz) {
                        this.selectedAnswer = solvedQuiz.selectedAnswer;
                        this.calculatedPoints = solvedQuiz.quizPoints;
                        quizReview = true;
                    }
                }
                return quizReview;
            }
        },
        methods: {
            parseQuizData: function(){
                const vm = this;

                // Quiz Answers SingleChoice
                let quizAnswers = JSON.parse(vm.quiz.quiz_answers).singlechoice;
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
            // check if the answers are text or images
            isImage: function(answer){
                let isImage = false;
                if(answer) isImage = has(answer, 'image_question[0].url');
                return isImage;
            },
            isSelected: function(answer){
                let isSelected = false;
                isSelected = isEqual(answer, this.selectedAnswer);
                return isSelected;
            },
            selectAnswer: function (answer) {
                this.selectedAnswer = answer;

                // Show Submit Btn
                if( this.selectedAnswer !== undefined) this.showSubmitAnswerBtn = true;
                else this.showSubmitAnswerBtn = false;
            },
            submitAnswer: function(){
                this.quizWasSubmitted = true;
                this.calculateQuestionPoints();
            },
            calculateQuestionPoints: function(){
                //calculate points
                if (this.correctAnswer == this.selectedAnswer) this.calculatedPoints = this.quizPoints;     
                else this.calculatedPoints = 0;

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

                let visitorData = { 'quizId' : this.quiz.root_item_id, 'quizPoints': this.calculatedPoints, 'selectedAnswer': this.selectedAnswer };
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