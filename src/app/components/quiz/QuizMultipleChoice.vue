<template>

       <section class="multiple-choice"
                v-if="quizItem"
                :id="`quiz-id-${quizId}`"
                :class="[{'quiz-was-answered' : quizWasSubmitted},
                {'quiz-review' : quizReview}]">

        <h3 class="quiz-question">{{quizItem.question_title}}</h3>

        <button v-for="(answer, index) in quizAnswers"
            class="mc-answer disable-pointer-events"
            :class="[{
                'selected' : isSelected(answer),
                'answered': quizWasSubmitted },
                answer.is_correct == 1 ? 'correct' : 'wrong']"
            :key="keyIds[index]"
            @click="selectAnswer(answer)">

            <label >{{answer.text_question}}</label>

        </button>


        <button v-if="!this.quizWasSubmitted" class="quiz-submit-btn" @click="submitAnswer">{{getTranslation('answer')}}</button>

    </section>

</template>



<script>

    import find from 'lodash/find';
    import forEach from 'lodash/forEach';
    import cloneDeep from 'lodash/cloneDeep';
    import uniqueId from 'lodash/uniqueId';
    import has from 'lodash/has';
    import isEqual from 'lodash/isEqual';
    import remove from'lodash/remove';


    import ExtendedSolution from './QuizExtendedSolution.vue';



    // expecting DB JSON DATA like:
    // {
    //     "multiplechoice": [
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

    // PARTIAL POINTS:
    // if you want to use partial points for MC, then quiz_content.calculatePartialPoints in DB shall be saved with value 1:
    // quiz.quiz_content.calculatePartialPoints = 1

    export default {
        props: {
            quizItem : {
                type: Object,
                default: null
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
            }
        },
        data() {
            return {
                isMounted: false,

                quiz: undefined,
                quizAnswers: undefined,
                quizContent: undefined,
                quizPoints: 0,
                extendedSolution: undefined,
                keyIds: [],
                calculatePartialPoints: false,

                correctAnswers: [],
                incorrectAnswers: [],
                selectedAnswers: [],

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
        computed: {
            quizReview: function(){
                if(this.quizWasSubmitted == true) return true; 
                else return false;
            }
        },
        created(){
            const vm = this;
            this.quiz = cloneDeep( find(fg.content.quiz[fg.state.visitor.languageId], function(quiz) { return vm.quizId == quiz.root_item_id } ) );
            // extract quizAnswers, quizContent, quizExtendedSolution and quizPoints
            if( this.quizItem !== undefined ){
                this.parseQuizData();
                // Find Correct Answer
                forEach(vm.quizAnswers, function(answer){
                    if (answer.is_correct == 1) vm.correctAnswers.push(answer);
                    else vm.incorrectAnswers.push(answer);    
                });
                // Create unique key ids for vue v-for loop
                forEach(vm.quizAnswers, function(answer){
                    vm.keyIds.push("mc-" + uniqueId());     
                });
            }
        },
        mounted(){
            this.isMounted = true;
        },
        methods: {
            parseQuizData: function(){
                const vm = this;

                // Quiz Answers MultipleChoice
                let quizAnswers = vm.quizItem.multiplechoice;
                if(quizAnswers) this.quizAnswers = quizAnswers;

                // Quiz Content
                let quizContent = vm.quizItem.quiz_content;
                if(quizContent) this.quizContent = quizContent[0];
            
                // Quiz Points
                if( vm.quizItem.quiz_points > 0 ) this.quizPoints = vm.quizItem.quiz_points;

            },
            isSelected: function(answer){
                const vm = this;
                let isSelected = false;
                let selected = find(vm.selectedAnswers, function(obj) { 
                    if( isEqual(answer, obj) ) return obj;
                });
                if(selected !== undefined) isSelected = true;
                return isSelected;
            },
            selectAnswer: function (answer) {
                const vm = this;

                if (this.selectedAnswers.includes(answer)) {    
                    vm.selectedAnswers = remove(vm.selectedAnswers, function(n) {
                        return n != answer;
                    });                
                } else {
                    this.selectedAnswers.push(answer);  
                }

                // Show / Hide Submit Btn
                if(this.selectedAnswers.length > 0) this.showSubmitAnswerBtn = true;
                else this.showSubmitAnswerBtn = false;

            },
            submitAnswer: function(){
                this.quizWasSubmitted = true;
            },
        }


    }
</script>


<style lang="less">

.quiz-question {
    margin: 3rem 0;
}

.mc-answer {
    display: block;
    width: 100%;
    padding: 1rem 1.5rem;
    border: 2px solid #82A989;
    color: #82A989;
    margin: 0 auto 2vh;
    border-radius: 200px;

    transition: 100ms all ease-in-out;
}

.mc-answer.selected {
    border: 2px solid #82A989;
    background: #82A989;
    color: #fff;
}

.mc-answer.answered.wrong {
    opacity: .3;
    border: 1px solid var(--main-red);
    background: var(--main-red);
    color: #fff;
}
.mc-answer.answered.correct {
    opacity: .3;
    border: 1px solid var(--main-green);
    background: var(--main-green);
    color: #fff;
}

.quiz-was-answered .mc-answer.selected.correct,
.quiz-review .mc-answer.selected.correct {
    border: 1px solid var(--main-green);
    background: var(--main-green);
    color: #fff;
    opacity: 1;
}

.quiz-was-answered .mc-answer.selected.wrong,
.quiz-review .mc-answer.selected.wrong {
    border: 1px solid var(--main-red);
    background: var(--main-red);
    color: #fff;
    opacity: 1;
}


.quiz-submit-btn {
    display: block;
    width: max-content;
    padding: 1rem 1.5rem;
    background: #82A989;
    margin-bottom: 1rem;
    border-radius: 200px;

    color: #fff;
    margin: 5vh auto;

    transform: translate3d(0, 0, 0);
}






</style>