import {
    GET_DATA,
    SET_LOADING,
    SET_INPUT,
    REMOVE_INPUT,
    SET_SUCCESS,
    UPDATE_SCORE,
} from "../types";

const initialState = {
    score: 0,
    level: {
        goal: null,
        hint: null,
    },
    scrambledData: null,
    words: [],
    input: [],
    goal: [],
    total: 0,
    mistakes: 0,
    success: false,
    loading: false,
};

export const scramblerReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DATA:
            return {
                ...state,
                level: { goal: action.payload.data, hint: action.payload.hint },
                scrambledData: action.payload.scrambledData,
                words: action.payload.data.split(" "),
                goal: action.payload.data.split(""),
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
        case UPDATE_SCORE:
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
