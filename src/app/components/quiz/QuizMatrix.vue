<template>
    
    <section class="matrix"
        v-if="quiz"
        ref="el"
        :id="`quiz-id-${quizId}`"
        :class="[{'quiz-was-answered' : quizWasSubmitted},
                 {'quiz-review' : quizReview}]">

        <h3 class="quiz-question">{{quiz.question_title}}</h3>

        <section class="matrix-rows-section">
            <div class="row disable-pointer-events"
                v-for="(row, index) in quizAnswers"
                :class="rowCorrect[index]"
                :data-row-index="index"
                :key="keyIds[index]">

                <!-- "Question - left side of a row" -->
                <div class="question"
                    :class="[{'question-image' : (row.matrix_type == 'image_to_text' || row.matrix_type == 'image_to_image') && isImage(row, 'question') }]">
                    <img v-if="isImage(row, 'question')" :src="fileURL(row.image_question[0].url)" alt="" />
                    <label v-else>{{row.text_question}}</label>
                    
                    <!-- if answer was solved show what was correct answer.
                    You can place this <div> anywhere in the row div element -->
                    <div class="correct-item" v-if="quizReview || quizWasSubmitted">
                        <label>{{getTranslation('quiz_the_correct_answer_is')}}</label>
                        <img v-if="(row.matrix_type == 'text_to_image' || row.matrix_type == 'image_to_image') && isImage(row, 'answer')"
                        :src="fileURL(row.image_answer[0].url)" />
                        <label v-else>{{row.text_answer}}</label>
                    </div>
                </div>

                <!-- "Answer" - right side of a row - place where a item can be dropped -->
                <div class="answer" :data-answer-index="index" :data-quiz-id="`quiz-id-${quizId}`" :class="'answer-' + quizId">
                    <!-- Show answered elements if it is a quiz review -->
                    <div class="answer-review" v-if="quizReview && !quizWasSubmitted"
                        :class="[{'answer-image' : (row.matrix_type == 'text_to_image' || row.matrix_type == 'image_to_image') && isImage(row, 'answer')}]" >
                        <img :src="fileURL(selectedAnswer[index].image_answer[0].url)" alt="" v-if="isImage(row, 'answer')" />
                        <label v-else>{{selectedAnswer[index].text_answer}}</label>
                    </div>
                </div>

            </div>
        </section>

        
        <!-- Item "toolbar" -->
        <section class="items-container disable-pointer-events"
                 v-if="!quizReview"
                 :data-quiz-id="`quiz-id-${quizId}`">
            <div v-for="(item, index) in shuffledItems" class="item"
                :key="keyIds[index]"
                :data-quiz-id="`quiz-id-${quizId}`"
                :data-item-index="item.orderIndex"
                :class="[item.image_answer && item.image_answer.length > 0 ? 'image-item' : 'text-item', 'item-' + quizId]"
                :style="[{'order' : index}]">

                <img v-if="(item.matrix_type == 'text_to_image' || item.matrix_type == 'image_to_image') && isImage(item, 'answer')"
                    :src="fileURL(item.image_answer[0].url)"/>
                <label v-else>{{item.text_answer}}</label>

            </div>
        </section>



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
    import findIndex from 'lodash/findIndex';
    import forEach from 'lodash/forEach';
    import cloneDeep from 'lodash/cloneDeep';
    import uniqueId from 'lodash/uniqueId';
    import has from 'lodash/has';
    import isEqual from 'lodash/isEqual';
    import size from 'lodash/size';


    import interact from 'interactjs';

    import ExtendedSolution from './QuizExtendedSolution.vue';


    // expecting JSON DATA like:
    //    {
    //     "matrix": [
    //         {
    //             "matrix_type": "text_to_text",
    //             "text_answer": "Text answer",
    //             "image_answer": [],
    //             "text_question": "Text question",
    //             "image_question": []
    //         },
    //         {
    //             "matrix_type": "text_to_text",
    //             "text_answer": "Text answer 2",
    //             "image_answer": [],
    //             "text_question": "Text question 2",
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

                rowCorrect: [],
                shuffledItems: null,
                matrixNode: null,
                itemsContainerNode: null,

                selectedAnswer: [],

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
        created() {
            const vm = this;
            this.quiz = cloneDeep( find(fg.content.quiz[fg.state.visitor.languageId], function(quiz) { return vm.quizId == quiz.root_item_id } ) );

            // extract quizAnswers, quizContent, quizExtendedSolution and quizPoints
            if( this.quiz !== undefined ){

                this.parseQuizData();
                this.shuffleItems();

                // Create unique key ids for vue v-for loop
                forEach(vm.quizAnswers, function(answer){
                    vm.keyIds.push("mx-" + uniqueId());     
                });
            }
        },
        mounted(){
            const vm = this;

            this.isMounted = true;

            // extract quizAnswers, quizContent, quizExtendedSolution and quizPoints
            if( this.quiz !== undefined ){

                this.$nextTick(() => {

                    // initialize node-elements
                    vm.matrixNode = vm.$el;
                    vm.itemsContainerNode = vm.matrixNode.querySelector(".items-container");

                    // create dropzones
                    interact('.answer-' + vm.quizId).dropzone({
                        accept: '.item-' + vm.quizId,
                        overlap: 0.50,

                        ondrop: function(event) {
                            const dropzone = event.target;
                            const item = event.relatedTarget;

                            const oldItem = dropzone.querySelector('.item-' + vm.quizId);
                            if(oldItem) item.origin.appendChild(oldItem);

                            dropzone.appendChild(item);
                        },
                        ondragenter: function(event){
                            event.target.classList.add("drop");
                        },
                        ondragleave: function(event){
                            event.target.classList.remove("drop");
                        },
                        ondropdeactivate: function (event) {
                            event.target.classList.remove('drop');
                        }
                    });

                    // create draggable items
                    interact('.item-' + vm.quizId).draggable({
                        inertia: false,
                        modifiers: [
                            interact.modifiers.restrictRect({
                                endOnly: true
                            })
                        ],
                        autoScroll: true,
                        listeners: {
                            start: vm.dragStartListener,
                            move: vm.dragMoveListener,
                            end: vm.dragEndListener
                        }
                    });

                });
                
            }
        },
        computed: {
            quizReview: function(){
                const vm = this;
                let quizReview = false;
                if(this.showQuizReview == true && this.saveDataInVisitorState == true){
                    let solvedQuiz = cloneDeep(fg.state.visitor.quiz[this.quizId]);
                    if(solvedQuiz && vm.quizAnswers) {
                        this.selectedAnswer = solvedQuiz.selectedAnswer;
                        this.calculatedPoints = solvedQuiz.quizPoints;
                        quizReview = true;

                        this.isRowCorrect();
                    }
                }
                return quizReview;
            }
        },
        methods: {
            parseQuizData: function(){
                const vm = this;

                // Quiz Answers SingleChoice
                let quizAnswers = JSON.parse(vm.quiz.quiz_answers).matrix;
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
            shuffleItems: function(){
                const vm = this;
                // Shuffle Matrix Answers
                this.shuffledItems = cloneDeep(vm.quizAnswers);
                // create index parameter on each shuffle item, it's needed for the calculate points function, to compare question and dropped item
                forEach(vm.shuffledItems, function(item, index){
                    item.orderIndex = index;
                });
                this.shuffledItems = this.shuffledItems.sort(function(){return 0.5 - Math.random()});
            },
            // check if the answers are text or images
            isImage: function(row, imageType){
                let isImage = false;
                // Check if it is answer or question image
                if(row) {
                    if(imageType == 'answer') isImage = has(row, 'image_answer[0].url'); 
                    else isImage = has(row, 'image_question[0].url'); 
                }
                return isImage;
            },
            isRowCorrect: function(){
                const vm = this;
                forEach(vm.selectedAnswer, function(selectedAnswer , index){
                    if( isEqual(selectedAnswer, vm.quizAnswers[index]) ) vm.rowCorrect.push('answered-correct');
                    else vm.rowCorrect.push('answered-wrong');
                });
            },
            dragStartListener: function (event) {
                const vm = this;
                const item = event.target;

                // get the postion
                const rect = item.getBoundingClientRect();
                const matrixRect = vm.matrixNode.getBoundingClientRect();
                
                // Remember previous parent
                item.origin = item.parentNode;

                // set position to absolute
                item.classList.add("drag");

                item.style.left = rect.x - matrixRect.x + "px";
                item.style.top = rect.y - matrixRect.y + "px";

                // remember position
                item.setAttribute("data-x", rect.x - matrixRect.x);
                item.setAttribute("data-y", rect.y - matrixRect.y);

                // move item to full view
                vm.matrixNode.appendChild(item);

                // Remove empty class when you start moving items
                if( size(vm.matrixNode.querySelector(".items-container.empty")) > 0) {
                    vm.matrixNode.querySelector(".items-container").classList.remove('empty')
                }

                // Hide Submit Button when you are dragging
                vm.showSubmitAnswerBtn = false;
            },
            // Triggers when the item moves (and moves the item)
            dragMoveListener: function (event) {
                let target = event.target;
                // keep the dragged position in the data-x/data-y attributes
                let x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
                let y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

                target.style.left = x + "px";
                target.style.top = y + "px";
            
                // update the position attributes
                target.setAttribute('data-x', x);
                target.setAttribute('data-y', y);
            },
            // Triggers when the finger goes up from the item
            dragEndListener: function (event) {
                const element = event.target;
                const vm = this;

                // when a item gets dropped it doesn't have '.item-container' as silbling
                let itemContainer = element.parentNode.querySelector(".items-container");

                if(itemContainer) itemContainer.appendChild(element);
                element.classList.remove("drag");

                // If item Container is empty and class to it 
                if(vm.matrixNode.querySelectorAll(".items-container .item").length == 0) {
                    vm.matrixNode.querySelector(".items-container").classList.add('empty');
                }
                else {
                    vm.matrixNode.querySelector(".items-container").classList.remove('empty');
                }

                // Check if there item in the right column, if so add "logged" class on parent element, else remove it
                let right_answers = vm.matrixNode.querySelectorAll(".answer");
                forEach(right_answers, function(right_answer){
                    if(right_answer.querySelector('.item')) right_answer.classList.add('logged');
                    else right_answer.classList.remove('logged');
                });

                // Listen for Show / Hide Submit Btn
                let answers = vm.matrixNode.querySelectorAll(".answer .item").length;
                if(vm.quizAnswers.length == answers) vm.showSubmitAnswerBtn = true;
                else vm.showSubmitAnswerBtn = false;

            },
            submitAnswer: function(){
                this.quizWasSubmitted = true;
                this.calculateQuestionPoints();
            },
            calculateQuestionPoints: function(){
                const vm = this;

                let correctPoints = 0;
                let answers = vm.matrixNode.querySelectorAll(".answer");

                for(let dropzone of answers) {
                    let item = dropzone.querySelector(".item");
                    if(item){
                        if( dropzone.getAttribute("data-answer-index") == item.getAttribute("data-item-index")) correctPoints++;
                        let answeredIndex = item.getAttribute("data-item-index");
                        vm.selectedAnswer.push(vm.quizAnswers[answeredIndex]);
                    }
                }

                vm.isRowCorrect();

                // Calculate Points
                vm.calculatedPoints = correctPoints * vm.quizPoints;

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

                // TODO: save visitor data in state
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