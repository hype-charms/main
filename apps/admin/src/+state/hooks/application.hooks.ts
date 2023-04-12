import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "..";
import * as applicationActions from '../actions/application.actions'
import { ThemeColors } from "../reducers";

export function useSetTheme(): [ThemeColors, (theme: ThemeColors) => void] {
    const dispatch = useDispatch();
    const theme = useAppSelector(state => state.applicationReducer.theme);
    return [theme, useCallback((theme) => {
        window.localStorage.setItem('theme', JSON.stringify(theme))
        dispatch(applicationActions.updateTheme(theme))
    }, [dispatch])]
}