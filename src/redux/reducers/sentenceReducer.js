import {
    GET_SENTENCE,
    SET_LOADING,
    SET_INPUT,
    REMOVE_INPUT,
    SET_SUCCESS,
} from "../types";

const initialState = {
    level: 1,
    sentence: null,
    scrambledSentence: null,
    words: [],
    input: [],
    goal: [],
    success: false,
    loading: false,
};

export const sentenceReducer = (state = initialState, action) => {
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
            console.log("setting input");
            return {
                ...state,
                input: [...state.input, action.payload],
            };
        case REMOVE_INPUT:
            console.log("removing input");
            return {
                ...state,
                input: state.input.slice(0, -1),
            };
        case SET_LOADING:
            console.log("loading in reducer");
            return {
                ...state,
                loading: true,
            };
        case SET_SUCCESS:
            return {
                ...state,
                success: true,
            };
        default:
            return state;
    }
};
