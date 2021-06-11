import { GET_SENTENCE, SET_LOADING } from "../types";

const initialState = {
    level: 1,
    sentence: null,
    scrambledSentence: null,
    words: null,
    success: false,
    loading: false,
    input: [],
};

export const sentenceReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SENTENCE:
            return {
                ...state,
                sentence: action.payload.sentence,
                scrambledSentence: action.payload.scrambledSentence,
                loading: false,
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
