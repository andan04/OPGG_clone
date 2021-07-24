import React from "react";
import championTier from "../assets/icon-champion-p.png";
import championTier1 from "../assets/icon-champtier-1.png";
import tierStay from "../assets/icon-championtier-stay.png";
import champion32 from "../assets/champion32.png";
import { number } from "yargs";
import ChampionTrendHeader from "./ChampionTrendHeader";
import styled, { css } from "styled-components";
import tierUp from "../assets/icon-championtier-up.png";
import tierDown from "../assets/icon-championtier-down.png";
import classnames from "classnames";
import { StringLiteralLike } from "typescript";


interface ChampionTrendItemProps
{
    championID: number;
    change: number;
    name: string;
    position: string;
    win: string;
    pick: string;
    tier: string;
    rank: string;
    trendType: string;
    banRate: string;
}

const ChampionTrendItemWrapper = styled(ChampionTrendHeader)`
    background-color: white;
    border: 1px solid #e9eff4;
    padding: 15px 0;

    &:not(:last-child)
    {
        border-bottom: none;
    }
    & > .rank{
        font-style: italic;
        font-size: 20px;
    }

    & > .champ {
        display: flex;
        align-items: center;
        text-align: left;
        & > .img{
            width: 32px;
            height: 32px;
            background-image: url(${champion32});
        }

        & > .change{
            display: flex;
            align-items: center;
            font-size: 14px;
            line-height: 14px;
            padding: 0 10px;
            width: 40px;
            box-sizing: border-box;
            &.up
            {
                color: green;
            }
            &.down 
            {
                color: red;
            }

            & > img{
                margin-right: 2px;
            }
        }


        & > .champ-desc{
            font-size: 12px;
            margin-left: 5px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            & > :first-child{
                font-weight: bold;
            }
        }
    }
`

const ChampionTrendItem: React.FC<ChampionTrendItemProps> = (props) => {
    const getTierChangeIcon = () => 
    {                
        if(props.change > 0)
        {
            return tierUp;
        }
        else if (props.change < 0)
        {
            return tierDown;
        }
        else
        {
            return tierStay;
        }
    }
    return (
        <ChampionTrendItemWrapper>
            <div className = "rank">{props.rank}</div>
            <div className = "champ">
                <div className = {classnames("change", {up: props.change > 0, down: props.change < 0})}>
                    <img src={getTierChangeIcon()} alt="" />
                    {Math.abs(props.change)}
                </div>
                <div className = {`img __spc32-${props.championID}`}>
                </div>
                <div className = "champ-desc">
                    <div>{props.name}</div>
                    <div>{props.position}</div>
                </div>
            </div>
            <div className = "win" hidden = {props.trendType === "banratio" || props.trendType === "pickratio"} style = {{color: "#4A90E2"}}>{props.win}</div>
            <div className = "pick" hidden = {props.trendType === "banratio" || props.trendType === "pickratio"}>{props.pick}</div>
            <div className = "pick" hidden = {props.trendType !== "pickratio"} style = {{color: "#4A90E2"}}>{props.pick}</div>
            <div className = "win" hidden = {props.trendType !== "pickratio"}>{props.win}</div>

            <div className = "tier" hidden = {props.trendType !== "tier"}>
                <img src={props.tier} alt="" />
            </div>
            <div hidden = {props.trendType !== "banratio"} style = {{color: "#4A90E2"}}>{props.banRate}</div>

        </ChampionTrendItemWrapper>
    )
}

export default ChampionTrendItem;