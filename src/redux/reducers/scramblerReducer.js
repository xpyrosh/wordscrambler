import {
    GET_DATA,
    SET_LOADING,
    SET_INPUT,
    REMOVE_INPUT,
    SET_SUCCESS,
    UPDATE_SCORE,
    INCREMENT_MISTAKES,
    START_TIME,
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
    totalChars: 0,
    mistakes: 0,
    startTime: null,
    endTime: null,
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
                totalChars: state.totalChars + action.payload.chars,
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
        case START_TIME:
            return {
                ...state,
                startTime: action.payload,
            };
        case SET_SUCCESS:
            return {
                ...state,
                success: true,
                endTime: new Date(),
            };
        case UPDATE_SCORE:
            return {
                ...state,
                score: state.score + 1,
                input: [],
            };
        case INCREMENT_MISTAKES:
            return {
                ...state,
                mistakes: state.mistakes + 1,
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
