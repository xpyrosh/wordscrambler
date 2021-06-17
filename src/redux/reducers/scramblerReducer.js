import {
    GET_SENTENCE,
    SET_LOADING,
    SET_INPUT,
    REMOVE_INPUT,
    SET_SUCCESS,
    NEXT_PHRASE,
} from "../types";

const initialState = {
    score: 0,
    sentence: null,
    scrambledSentence: null,
    words: [],
    input: [],
    goal: [],
    success: false,
    loading: false,
};

export const scramblerReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SENTENCE:
            return {
                ...state,
                sentence: action.payload.sentence,
                scrambledSentence: action.payload.scrambledSentence,
                words: action.payload.sentence.split(" "),
                goal: action.payload.sentence.split(""),
                loading: false,
                success: false,
            };
        case SET_INPUT:
            return {
                ...state,
                input: [...state.input, action.payload],
            };
        case SET_SUCCESS:
            return {
                ...state,
                success: true,
            };
        case NEXT_PHRASE:
            return {
                ...state,
                score: state.score + 1,
                input: [],
            };
        case REMOVE_INPUT:
            return {
                ...state,
                input: state.input.slice(0, -1),
            };
        case SET_LOADING:
            return {
                ...state,
                loading: true,
            };
        default:
            return state;
    }
};
