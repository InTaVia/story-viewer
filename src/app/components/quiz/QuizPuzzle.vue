<template>
	
	<section class="quiz-puzzle"
        v-if="quiz"
        :id="`quiz-id-${quizId}`"
        :class="[{'quiz-was-answered' : quizWasSubmitted},
                 {'quiz-review' : quizReview}]">

        <h3 class="quiz-question">{{quiz.question_title}}</h3>

			<!--
				cols-prop -> Number of columns in puzzle
				rows-prop -> Number of rows in puzzle
				scale-prop -> how much space will take puzzle and spead puzzle pieces, 0.8 optimal number, everything beyond it might cause puzzle pieces to be cutted/be outside the canvas area
				image-url -> image url with fileURL function (IMPORTANT -> use images with max-size of 600px)
				themeProp -> style the puzzle, allowed only RGB as an array variable
			-->

			<Puzzle
				v-if="!quizReview"
				@puzzle-solved="puzzleSolved"
				scale-prop="0.8"
				:cols-prop="cols"
				:rows-prop="rows"
				:image-url="fileURL(puzzleImage)"
				:theme-prop="{background: hexToRgb('#FFF0C9'),
							board: [ 221, 135, 105 ],
							board_fill: [ 114, 64, 49 ],
							board_outline: [ 114, 64, 49 ]}"/>
			<section class="puzzle-section" v-else>
				<img :src="fileURL(puzzleImage)" class="puzzle-review-image" />
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

///// !IMPORTANT: Install p5 first as dependency:
///// npm i p5


import cloneDeep from 'lodash/cloneDeep';
import find from 'lodash/find';


import Puzzle from './puzzle/Puzzle.vue';
import ExtendedSolution from './QuizExtendedSolution.vue';


// expecting DB JSON DATA like:
// {
//     "puzzle": [
	//         {
	// 			"cols": "5",
	// 			"rows": "5",
	// 			"image_question": []
// 			}
//     ]
// }


export default {
	components: {
		Puzzle,
		ExtendedSolution
	},
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
			puzzleImage: undefined,

			isMounted: false,

			quiz: undefined,
			quizAnswers: undefined,
			quizContent: undefined,
			quizPoints: 0,
			extendedSolution: undefined,
			
			puzzleImage: undefined,
			cols: undefined,
			rows: undefined,

			selectedAnswer: undefined,
            calculatedPoints: 0,
			
			quizWasSubmitted: false,
			showSubmitAnswerBtn: false,
			showExtendedSolutionBtn: false,
			extendedSolutionActive: false,
			showEndQuizBtn: false
		};
	},
	created(){
		const vm = this;
        this.quiz = cloneDeep( find(fg.content.quiz[fg.state.visitor.languageId], function(quiz) { return vm.quizId == quiz.root_item_id } ) );

        // extract quizAnswers, quizContent, quizExtendedSolution and quizPoints
        if( this.quiz !== undefined ){
            this.parseQuizData(); 
			this.puzzleImage = this.quizAnswers.image_question[0].url;
			this.cols = this.quizAnswers.cols;
			this.rows = this.quizAnswers.rows;
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

			// Quiz Answers Puzzle
			let quizAnswers = JSON.parse(vm.quiz.quiz_answers).puzzle[0];
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
		hexToRgb(hex) {
			
			// convert your hex to rgb
			var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

			let r = parseInt(result[1], 16);
			let g = parseInt(result[2], 16);
			let b = parseInt(result[3], 16);

			let rgb = [];
			if(result){
				rgb.push(r)
				rgb.push(g)
				rgb.push(b)
			}
			else rgb.push(255);

			return rgb;
		},
		puzzleSolved: function(){
			this.quizWasSubmitted = true;
            this.calculateQuestionPoints();
		},
		calculateQuestionPoints: function(){
			//calculate points
			this.calculatedPoints = this.quizPoints;

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

			let visitorData = { 'quizId' : this.quiz.root_item_id, 'quizPoints': this.calculatedPoints, 'selectedAnswer': this.puzzleImage };
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
	},
};
</script>

<style lang="less">

</style>
