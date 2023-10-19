<template>
	<section
                v-if="quiz"
                :id="`quiz-id-${quizId}`"
                class="hotspot"
                :class="[{'quiz-was-answered' : quizWasSubmitted}]">
                
        <h3 class="quiz-question">{{quiz.question_title}}</h3>

        <div class="hotspot-preview">
            <img class="" :src="fileURL(quizImage.core_image_hotspot_file[0].url)" alt=""/>
            <template v-if="isContinuation && isLocked">
                <button @click="openHotspotQuiz()">{{getTranslation('continue')}}</button>
            </template>
            <template v-else-if="(!isContinuation && !isLocked) || quizWasSubmitted">
                <button @click="openHotspotQuiz()">{{getTranslation('review')}}</button>
            </template>
            <template v-else>
                <button @click="openHotspotQuiz()">{{getTranslation('start')}}</button>
            </template>
        </div>

        <div v-if="quizWasSubmitted" class="result">
            <!-- Show points or result -->
        </div>

    </section>
    
    <teleport v-if="isMounted && dialog" to="#app-container">
        <transition name="fade">
            <div 
            class="hotspot-overlay" :isTeleported="{toElement: '#app-container'}" 
            :class="[{'quiz-was-answered' : quizWasSubmitted}]">
                <header>
                    <button @click="dialog = false">
                        Close
                    </button>
                    <div v-if="!quizWasSubmitted && isLocked" class="hotspot-overlay-attempts">Versuche: <span>{{attempts}}</span></div>
                </header>
                <section class="hotspot-image-wrapper">
                    <div class="hotspot-image" @click="findDetail">
                        <template v-for="(answer, index) in quizAnswers" :key="index">
                            <div :id="`hotspot-detail-${index}`" class="hotspot-detail" :class="[{transparent: isLocked}, {'correct' : isSelected(index) }]" :style="getHotspotStyles(answer)" :data-detail-index="index">
                                <!-- Icon for correct detail can be put here -->
                                C
                            </div>
                        </template>
                        <img :src="fileURL(quizImage.core_image_hotspot_file[0].url)" alt=""/>
                    </div>
                </section>
                <div></div>
            </div>
        </transition>
    </teleport>
</template>

<script>
import find from 'lodash/find';
import cloneDeep from 'lodash/cloneDeep';

// expecting DB JSON DATA like:
// {
//    "hotspot": [
//       {
//          "core_image_hotspot_file":[
//             {
//                "url":"public/content/fluxguide/exhibitions/1/ez-aaifwyaiifsq.jpeg"
//             }
//          ]
//       },
//       {
//          "core_image_hotspot_coordinates":{
//             "x":61.714285714285715,
//             "y":46.285714285714285
//          }
//       },
//      {
//          "core_image_hotspot_coordinates":{
//             "x":39.42857142857143,
//             "y":48.857142857142854
//          }
//       }
//    ]
// }


export default {
    components: {
    },
    props: {
        quizId : {
            type: String,
            default: ""
        },
        saveDataInVisitorState: {
            type: Boolean,
            default: true
        },
        isTeleported: {
            type: Object,
            default() {
                return {
                    toElement: "#app-container",
                    disabled: true
                }
            }
        }
    },
    emits: ['endQuizItem'],
    data() {
        return {
            isMounted: false,

            quiz: undefined,
            quizImage: undefined,
            quizAnswers: undefined,
            quizContent: undefined,
            quizPoints: 0,
            keyIds: [],
            calculatedPoints: null,            
            quizWasSubmitted: false,

            attempts: null,
            maxAttempts: 10,
            detailsFound: null,
            disableQuiz: false,
            detailSize: '80', // also needs to be set in styles

            dialog: false,
        };
    },
    computed: {
        isContinuation() {
            // If quiz is set but it hasnt been submitted yet
            return this.quizStarted && !fg.state.visitor.quiz[this.quiz.root_item_id].quizSolved;
        },
        isLocked() {
            // If quiz or quizSolved is not set
            return !this.quizStarted || !fg.state.visitor.quiz[this.quiz.root_item_id].quizSolved;
        },
        quizStarted() {
            return fg.state.visitor.quiz[this.quiz.root_item_id];
        }
    },
    created(){
        const vm = this;
        this.quiz = cloneDeep( find(fg.content.quiz[fg.state.visitor.languageId], function(quiz) { return vm.quizId == quiz.root_item_id } ) );

        // extract quizAnswers, quizContent, quizExtendedSolution and quizPoints
        if( this.quiz !== undefined ){            
            this.parseQuizData();
        }
    },
    mounted(){
        this.isMounted = true;
    },
    methods: {
        parseQuizData(){
            const vm = this;
            
            // Quiz Answers Estimation
            let quizAnswers = JSON.parse(vm.quiz.quiz_answers).hotspot;

            // First entry is initial image
            if(quizAnswers) {
                this.quizImage = quizAnswers[0];
                this.quizAnswers = quizAnswers.slice(1);
            }
            
            // Quiz Content
            let quizContent = JSON.parse(vm.quiz.quiz_content);
            if(quizContent) this.quizContent = quizContent[0];
            
            // Quiz Points
            if( vm.quiz.quiz_points > 0 ) this.quizPoints = vm.quiz.quiz_points;

            // Setup attempts, detailsFound and calculatedPoints
            if(this.quizStarted) {
                // Case 1: quiz has been started once and now continued
                this.attempts = fg.state.visitor.quiz[this.quiz.root_item_id].attempts;
                this.detailsFound = this.maxAttempts - this.attempts;
                this.calculatedPoints = fg.state.visitor.quiz[this.quiz.root_item_id].quizPoints;
            }
            else {
                // Case 2: new start
                this.attempts = this.maxAttempts;
                this.detailsFound = 0;
                this.calculatedPoints = 0;
            }
        },
        isSelected(id){
            // Check if detail has been clicked already
            let isSelected = false;

            if(this.quizStarted &&
            fg.state.visitor.quiz[this.quiz.root_item_id].details[id] &&
            fg.state.visitor.quiz[this.quiz.root_item_id].details[id].correct) 
                isSelected = true;
            return isSelected;
        },
        openHotspotQuiz() {
            this.dialog = true;
        },
        getHotspotStyles(detail) {
            return `top: calc(${detail.core_image_hotspot_coordinates.y}% - ${this.detailSize/2}px); left: calc(${detail.core_image_hotspot_coordinates.x}% - ${this.detailSize/2}px)`;
        },
        findDetail(event) {
            // Return if quiz has been solved already
            if(!this.isLocked) { return false; }

            const vm = this;
            const target = event.target;
            
            // Check if clicked element is a new hotspot detail
            if(target.classList.contains('hotspot-detail')) {
                if(target.classList.contains('transparent')) {
                    // Case 1: Detail found
                    target.classList.remove('transparent');
                    target.classList.add('correct');
                    this.attempts = this.attempts - 1; 
                    this.detailsFound++;                   
                    this.calculateQuestionPoints();
                    fg.state.visitor.quiz[this.quiz.root_item_id].details[target.dataset.detailIndex].correct = true;
                    
                    // If audio for correct detail should be included, put it here
                }
                if(this.detailsFound == this.quizAnswers.length) {
                    // Case 2: All details found
                    this.disableQuiz = true;
                    fg.core.toast(fg.core.getTranslation("foundDetails"), { duration: 3000, type: 'success' });
                    
                    setTimeout(() => {
                        vm.submitAnswer();
                    },1500);

                    setTimeout(function() {
                        vm.dialog = false;
                    }, 3500);
                }
            }
            else {
                // Case 3: Wrong/no detail clicked
                this.attempts = this.attempts - 1;

                // If audio for wrong detail should be included, put it here
            }
            
            // Case 4: End quiz because all attempts are taken
            if(this.attempts == 0) {
                this.disableQuiz = true;
                fg.core.toast(fg.core.getTranslation("attemptsTaken"), { duration: 3000, type: 'error' });

                // Show missing details, disable if missed details should remain hidden
                for(let i = 0; i <= this.quizAnswers.length - 1; i++) {
                    let detail = document.getElementById(`hotspot-detail-${i}`);
                    detail.classList.remove('transparent');     
                };

                setTimeout(() => {
                    vm.submitAnswer();
                }, 1500);
            }
        },
        submitAnswer(){
            this.quizWasSubmitted = true;
            this.endQuizItem();
            fg.state.visitor.quiz[this.quiz.root_item_id].quizSolved = true;
        },
        calculateQuestionPoints(){
            let pointPerDetail = parseInt(this.quizPoints) / this.quizAnswers.length;
            this.calculatedPoints = this.calculatedPoints + pointPerDetail;

            //save visitor data
            if(this.saveDataInVisitorState == true) this.saveVisitorData();
        },
        saveVisitorData(){
            if (fg.state.visitor.quiz == undefined) fg.state.visitor.quiz = {};
            
            // Save visitor data every time a detail has been clicked
            if (fg.state.visitor.quiz[this.quiz.root_item_id] == undefined) fg.state.visitor.quiz[this.quiz.root_item_id] = {};
            if (fg.state.visitor.quiz[this.quiz.root_item_id].details == undefined) fg.state.visitor.quiz[this.quiz.root_item_id].details = this.quizAnswers;
            
            fg.state.visitor.quiz[this.quiz.root_item_id].quizId = this.quiz.root_item_id;
            fg.state.visitor.quiz[this.quiz.root_item_id].quizPoints = parseInt(this.calculatedPoints);
            fg.state.visitor.quiz[this.quiz.root_item_id].attempts = this.attempts;
        },
        endQuizItem(){
            // trigger custom event - "quiz end"
            let quizId = this.quizId;
            this.$emit('endQuizItem', { quizId });
        },
    }


}
</script>

<style lang="less">
</style>