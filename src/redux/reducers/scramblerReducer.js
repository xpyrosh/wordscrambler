import {
    GET_DATA,
    SET_LOADING,
    SET_INPUT,
    REMOVE_INPUT,
    SET_SUCCESS,
    UPDATE_SCORE,
    INCREMENT_MISTAKES,
    START_TIME,
    SET_MODE,
    CLEAR_GAME,
} from "../types";

const initialState = {
    score: 0,
    level: {
        goal: null,
        hint: null,
        pronunciation: null,
    },
    scrambledData: null,
    words: [],
    input: [],
    goal: [],
    mode: "menu",
    totalChars: 0,
    mistakes: 0,
    levelMistakes: 0,
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
                level: {
                    goal: action.payload.data,
                    hint: action.payload.hint,
                    pronunciation: action.payload.pronunciation,
                },
                scrambledData: action.payload.scrambledData,
                totalChars: state.totalChars + action.payload.chars,
                words: action.payload.data.split(" "),
                goal: action.payload.data.split(""),
                levelMistakes: 0,
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
        case SET_MODE:
            return {
                ...state,
                mode: action.payload,
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
                levelMistakes: state.levelMistakes + 1,
            };
        case REMOVE_INPUT:
            return {
                ...state,
                input: state.input.slice(0, -1),
            };
        case CLEAR_GAME:
            return {
                ...state,
                score: 0,
                level: {
                    goal: null,
                    hint: null,
                    pronunciation: null,
                },
                scrambledData: null,
                words: [],
                input: [],
                goal: [],
                totalChars: 0,
                mistakes: 0,
                levelMistakes: 0,
                startTime: null,
                endTime: null,
                success: false,
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
