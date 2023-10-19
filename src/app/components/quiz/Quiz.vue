<template>

    <section v-if="Array.isArray(quizIds)" class="quiz-section swiper-no-swiping">
        <div
v-for="(quiz, index) in quizItems"
            :key="quiz.root_item_id"
            class="quiz-item"
            :class="{'is-solved' : quizSolvedIds.includes(quiz.root_item_id), 'is-active' : quizActiveId == index }"
            :data-key="quiz.root_item_id">
                <multiple-choice 
                    v-if="quiz.quiz_type == 'multiplechoice'"
                    :quiz-id="quiz.root_item_id"
                    :is-teleported="isTeleported"
                    :show-quiz-review="showQuizReview"
                    :save-data-in-visitor-state="saveDataInVisitorState"
                    :show-extended-solution="showExtendedSolution"
                    :show-end-quiz-item-button="showEndQuizItemButton"
                    @end-quiz-item="endQuizItem">
                </multiple-choice>
                <single-choice
                    v-if="quiz.quiz_type == 'singlechoice'"
                    :quiz-id="quiz.root_item_id"
                    :is-teleported="isTeleported"
                    :show-quiz-review="showQuizReview"
                    :save-data-in-visitor-state="saveDataInVisitorState"
                    :show-extended-solution="showExtendedSolution"
                    :show-end-quiz-item-button="showEndQuizItemButton"
                    @end-quiz-item="endQuizItem">
                </single-choice>
                <estimation
                    v-if="quiz.quiz_type == 'estimation'"
                    :quiz-id="quiz.root_item_id"
                    :is-teleported="isTeleported"
                    :show-quiz-review="showQuizReview"
                    :save-data-in-visitor-state="saveDataInVisitorState"
                    :show-extended-solution="showExtendedSolution"
                    :show-end-quiz-item-button="showEndQuizItemButton"
                    @end-quiz-item="endQuizItem">
                </estimation>
                <matrix
                    v-if="quiz.quiz_type == 'matrix'"
                    :quiz-id="quiz.root_item_id"
                    :is-teleported="isTeleported"
                    :show-quiz-review="showQuizReview"
                    :save-data-in-visitor-state="saveDataInVisitorState"
                    :show-extended-solution="showExtendedSolution"
                    :show-end-quiz-item-button="showEndQuizItemButton"
                    @end-quiz-item="endQuizItem">
                </matrix>
                <puzzle
                    v-if="quiz.quiz_type == 'puzzle'"
                    :quiz-id="quiz.root_item_id"
                    :is-teleported="isTeleported"
                    :show-quiz-review="showQuizReview"
                    :save-data-in-visitor-state="saveDataInVisitorState"
                    :show-extended-solution="showExtendedSolution"
                    :show-end-quiz-item-button="showEndQuizItemButton"
                    @end-quiz-item="endQuizItem">
                </puzzle>
                <Hotspot
                    v-if="quiz.quiz_type == 'hotspot'"
                    :quiz-id="quiz.root_item_id"
                    :is-teleported="isTeleported"
                    :save-data-in-visitor-state="saveDataInVisitorState"
                    @end-quiz-item="endQuizItem">
                </Hotspot>
        </div> 
    </section>

</template>


<script>

import forEach from 'lodash/forEach';
import find from 'lodash/find';

// import single quiz type components
import MultipleChoice from './QuizMultipleChoice.vue';
import SingleChoice from './QuizSingleChoice.vue';
import Estimation from './QuizEstimation.vue';
import Matrix from './QuizMatrix.vue';
import Puzzle from './QuizPuzzle.vue';
import Hotspot from './QuizHotspot.vue';


export default {

	components: {
        MultipleChoice,
        SingleChoice,
        Estimation,
        Matrix,
        Puzzle,
        Hotspot
    },
    props: {
        quizIds : {
            type: Array,
            default: []
        },
        isTeleported: {
            type: Object,
            default() {
                return {
                    toElement: "#app-container",
                    disabled: true
                }
            }
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
        }
    },
    emits: ['quizEnd'],
    setup() {
        if (fg.state.visitor.quiz == undefined) fg.state.visitor.quiz = {};
    },
	data() {
		return {
            quizSolvedIds: [],
            quizArraySolved: false
		};
	},
	computed: {
        quizActiveId() {
            let activeQuizIndex = this.quizSolvedIds.length;
            return activeQuizIndex;
        },
        quizItems() {
            
            let quizArray = [];
            const vm = this;

            forEach(vm.quizIds, function(id){
                let quiz = find(fg.content.quiz[fg.state.visitor.languageId], function(quiz) { return id == quiz.root_item_id } );
                
                if(quiz){
                    quizArray.push(quiz);
                }
            });

            return quizArray;
        },

	},
	watch: {
	},
	created: function(){
	},
	mounted: function(){	
	},
	methods: {
        endQuizItem(data) {
            if( !this.quizSolvedIds.includes(data.quizId) ) this.quizSolvedIds.push(data.quizId);
            this.isQuizArraySolved();
        },
        isQuizArraySolved(){
            if(this.quizIds.length == this.quizSolvedIds.length) {
                let quizIds = this.quizIds;

                this.quizArraySolved = true;
                this.$emit('quizEnd', { quizIds });
            }
        }
	}
};


</script>


<style lang="less">

    @import './Quiz.less';

</style>
