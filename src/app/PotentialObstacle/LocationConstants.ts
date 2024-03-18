import { LocaleAnalysisResult } from "next/dist/server/future/helpers/i18n-provider"

export default interface LocationConstants {
    kind : string[],
    list : string[][]
}

export const ListOfProducers : LocationConstants = {
    kind : ["A","B","C"],
    list :[
    ["food","stone","spice"],
    ["food","spice","silk"],
    ["food","silk","stone"],
    ["food","stone","wood"],
    ["food","spice","water"],
    ["wood","spice","silk"],
    ["wood","stone","spice"],
    ["wood","food","stone"],
    ["wood","spice","food"],
    ["wood","spice","water"],
    ["stone","spice","silk"],
    ["stone","wood","spice"],
    ["stone","silk","food"],
    ["stone","food","wood"],
    ["stone","spice","water"],
    ["water","food","wood"],
    ["water","wood","food"],
    ["spice","stone","silk"],
    ["spice","food","wood"],
    ["spice","wood","stone"],
    ["spice","stone","food"],
    ["spice","food","water"],
    ["silk","stone","spice"],
    ["silk","wood","stone"],
    ["silk","spice","food"],
    ["silk","food","wood"],
    ["silk","wood","water"]
    ]
}

export const ListOfObstacles : LocationConstants = 
{
    kind : ["A","B","B","C"],
    list : [
    ["wood","","water","silk"],
    ["","wood","spice","silk"],
    ["stone","","water","spice"],
    ["","stone","food","silk"],
    ["spice","","food","wood"],
    ["","spice","stone","silk"],
    ["silk","","food","wood"],
    ["","stone","silk","spice"],
    ["","spice","silk","stone"],
    ["food","","wood","silk"],
    ["food","","wood","spice"],
    ["","food","stone","silk"],
    ["water","food","stone",""],
    ["water","food","wood","stone"],
    ["spice","","wood","water"],
    ["","spice","stone","wood"],
    ["","stone","food","spice"],
    ["wood","","food","silk"]
    ]
}

export const ListOfCities : LocationConstants = {
    kind : ["B","C","C","C"],
    list: [
        ["stone","silk","food","wood"],
        ["wood","silk","stone","food"],
        ["food","silk","stone","wood"],
        ["food","spice","stone","wood"],
        ["water","spice","stone","wood"],
        ["spice","silk","food","wood"],
        ["wood","silk","spice","food"],
        ["wood","silk","spice","water"],
        ["spice","silk","stone","food"],
        ["stone","spice","food","wood"],
        ["wood","spice","stone","food"],
        ["food","silk","spice","wood"],
        ["water","silk","spice","wood"],
        ["food","silk","spice","stone"],
        ["spice","silk","stone","wood"],
    ]
}
