

import netflix from "./netflix.avif"
import instagram from "./instagram.avif"
import youtube from "./youtube.avif"

import adult from "./adult.avif"
import child from "./child.avif"
import old from "./old.avif"

import Airconditioner from "./Ac.avif"
import Refrigerator from "./Refrigerator.avif"
import Cooler from "./cooler.avif"

import bicycle from "./bicycle.avif"
import bike from "./bike.avif"
import car from "./car.avif"

export const questionOfLession1 = [
    {
        qId: "1",
        equation: "6+4",
        correctAnswer: "10",
        userAnswer: "",
        isFlag: false,
        isVisited: false,
        noOfAttempt: "4",
        qStatus: "notAttempt",

    },
    {
        qId: "2",
        equation: "(7-3)*5+4",
        correctAnswer: "24",
        userAnswer: "",
        isFlag: false,
        isVisited: false,
        noOfAttempt: "4",
        qStatus: "notAttempt",

    },
    {
        qId: "3",
        equation: "8*0.25",
        correctAnswer: "2",
        userAnswer: "",
        isFlag: false,
        isVisited: false,
        noOfAttempt: "4",
        qStatus: "notAttempt",

    },
    {
        qId: "4",
        equation: "12*3/4",
        correctAnswer: "9",
        userAnswer: "",
        isFlag: false,
        isVisited: false,
        noOfAttempt: "4",
        qStatus: "notAttempt",

    },
    {
        qId: "5",
        equation: "7%2",
        correctAnswer: "1",
        userAnswer: "",
        isFlag: false,
        isVisited: false,
        noOfAttempt: "4",
        qStatus: "notAttempt",

    },

]

export const questionOfLession2 = [
    {
        qId: "1",
        equation: "His old shoes _ stood him in good - in his travels. ",
        correctAnswer: ["have", "stead"],
        userAnswer: { have: "", stead: "" },
        options: ["Have", "Stead", "Manner"],
        isFlag: false,
        isVisited: false,
        noOfAttempt: "4",
        qStatus: "notAttempt",

    },

    {
        qId: "2",
        equation: "The old lady _ murdered - cold *.",
        correctAnswer: ["was", "in", "blood"],
        userAnswer: { was: "", in: "", blood: "" },
        options: ["was", "in", "blood", "ice"],
        isFlag: false,
        isVisited: false,
        noOfAttempt: "4",
        qStatus: "notAttempt",

    },
    {
        qId: "3",
        equation: "The train _left when we - at the station.",
        correctAnswer: ["had", "arrived"],
        userAnswer: { had: "", arrived: "" },
        options: ["was", "had", "had arrived", "arrived"],
        isFlag: false,
        isVisited: false,
        noOfAttempt: "4",
        qStatus: "notAttempt",

    },
    {
        qId: "4",
        equation: "The peasantry _ the most vulnerable - climate change impacts.",
        correctAnswer: ["are", "to"],
        userAnswer: { are: "", to: "" },
        options: ["is", "are", "to", "for"],
        isFlag: false,
        isVisited: false,
        noOfAttempt: "4",
        qStatus: "notAttempt",

    },
    {


        qId: "5",
        equation: "Smoking _ never be given up, as long as - tobacco industry thrives. ",
        correctAnswer: ["will", "the "],
        userAnswer: { will: "", the : "" },
        options: ["the", "will", "an", "can"],
        isFlag: false,
        isVisited: false,
        noOfAttempt: "4",
        qStatus: "notAttempt",

    },

]


export const questionOfLession3 = [
    {
        qId: "1",
        equation: "Sort  the Images in correct order",
        options: ["PDF", "CSS", "HTML"],
        images_arr: [
            "https://cdn-icons-png.flaticon.com/512/732/732212.png",
            "https://cdn-icons-png.flaticon.com/512/5968/5968242.png",
            "https://cdn-icons-png.flaticon.com/128/482/482216.png",
        ],
        correctAnswer: ["HTML", "CSS", "PDF"],
        userAnswer: ["PDF", "CSS", "HTML"],
        isFlag: false,
        isVisited: false,
        noOfAttempt: "4",
        qStatus: "notAttempt",

    },
    {
        qId: "2",
        equation: "Sort  the names increasing order of age ",
        options: ["adult", "old", "child"],
        images_arr: [
            child,
            adult,
            old,
        ],
        correctAnswer: ["child", "adult", "old"],
        userAnswer: ["adult", "old", "child"],
        isFlag: false,
        isVisited: false,
        noOfAttempt: "4",
        qStatus: "notAttempt",

    },
    {
        qId: "3",
        equation: "Sort  the Images in given order",
        options: ["Refrigerator", "cooler", "Airconditioner"],
        images_arr: [
            Cooler,
            Airconditioner,
            Refrigerator,
        ],
        correctAnswer: ["cooler", "Airconditioner", "Refrigerator"],
        userAnswer: ["Refrigerator", "cooler", "Airconditioner"],
        isFlag: false,
        isVisited: false,
        noOfAttempt: "4",
        qStatus: "notAttempt",

    },
    {
        qId: "4",
        equation: "Sort  the Imag in correct order",
        options: ["youtube", "netflix", "instagram"],
        images_arr: [
            netflix,
            instagram,
            youtube,
        ],
        correctAnswer: ["netflix", "instagram", "youtube"],
        userAnswer: ["youtube", "netflix", "instagram"],
        isFlag: false,
        isVisited: false,
        noOfAttempt: "4",
        qStatus: "notAttempt",

    },
    {
        qId: "5",
        equation: "Sort  the Images in correct order",
        options: ["bike", "car", "bicycle"],
        images_arr: [
            bicycle,
            bike,
            car,
        ],
        correctAnswer: ["bicycle", "bike", "car"],
        userAnswer: ["bike", "car", "bicycle"],
        isFlag: false,
        isVisited: false,
        noOfAttempt: "4",
        qStatus: "notAttempt",

    },

]

export const questionOfLession4 = [
    {
        qId: "1",
        equation: "Sort  the Alphabets in correct order",
        options: ["B", "D", "C", "A"],
        correctAnswer: ["A", "B", "C", "D"],
        userAnswer: ["B", "D", "C", "A"],
        isFlag: false,
        isVisited: false,
        noOfAttempt: "4",
        qStatus: "notAttempt",

    },
    {
        qId: "2",
        equation: "Sort  the squares of the numbers in correct order",
        options: ["256", "4", "1", "16"],
        correctAnswer: ["1", "4", "16", "256"],
        userAnswer: ["256", "4", "1", "16"],
        isFlag: false,
        isVisited: false,
        noOfAttempt: "4",
        qStatus: "notAttempt",

    },
    {
        qId: "3",
        equation: "Arrange the order of the terms",
        options: ["cubic", "quintic", "quartic", "quadratic"],
        correctAnswer: ["quadratic", "cubic", "quartic", "quintic"],
        userAnswer: ["cubic", "quintic", "quartic", "quadratic"],
        isFlag: false,
        isVisited: false,
        noOfAttempt: "4",
        qStatus: "notAttempt",

    },
    {
        qId: "4",
        equation: "Sort the following colors alphabetically.",
        options: ["Green", "Yellow", "Blue", "Red"],
        correctAnswer: ["Blue", "Green", "Red", "Yellow"],
        userAnswer: ["Green", "Yellow", "Blue", "Red"],
        isFlag: false,
        isVisited: false,
        noOfAttempt: "4",
        qStatus: "notAttempt",

    },
    {
        qId: "5",
        equation: " Arrange the following animals based on their average lifespan, from shortest to longest.",
        options: ["Parrot", "Tortoise", "Rabbit", "Elephant"],
        correctAnswer: ["Rabbit", "Parrot", "Elephant", "Tortoise"],
        userAnswer: ["Parrot", "Tortoise", "Rabbit", "Elephant"],
        isFlag: false,
        isVisited: false,
        noOfAttempt: "7",
        qStatus: "notAttempt",

    },

]

export const questionOfLession5 = [
    {
        qId: "1",
        equation: "Which planet is known as the 'Red Planet' in our solar system?",
        options: ["Mars", "Jupiter", "Venus"," Saturn"],
        correctAnswer: "Mars",
        userAnswer: null,
        isFlag: false,
        isVisited: false,
        noOfAttempt: "4",
        qStatus: "notAttempt",

    },
    {
        qId: "2",
        equation: "What is the capital city of Australia?",
        options: ["Sydney", "Canberra", " Melbourne"," Brisbane"],
        correctAnswer: "Canberra",
        userAnswer: null,
        isFlag: false,
        isVisited: false,
        noOfAttempt: "4",
        qStatus: "notAttempt",

    },
    {
        qId: "3",
        equation: "What is the chemical symbol for gold?",
        options: ["Au", " Ag", " Fe","Hg"],
        correctAnswer: "Au",
        userAnswer: null,
        isFlag: false,
        isVisited: false,
        noOfAttempt: "4",
        qStatus: "notAttempt",

    },
    {
        qId: "4",
        equation: "Who wrote the play 'Waiting for Godot', considered a classic of the Theater of the Absurd?",
        options: ["Harold Pinter", "Eugene Ionesco", "Samuel Beckett","Jean-Paul Sartre"],
        correctAnswer: "Samuel Beckett",
        userAnswer: null,
        isFlag: false,
        isVisited: false,
        noOfAttempt: "4",
        qStatus: "notAttempt",

    },
    {
        qId: "5",
        equation: "Which chemical element has the highest melting point?",
        options: ["Rhenium", "Platinum", " Osmium","Tungsten"],
        correctAnswer: "Tungsten",
        userAnswer: null,
        isFlag: false,
        isVisited: false,
        noOfAttempt: "4",
        qStatus: "notAttempt",

    },

]

export const questionOfLession6 = [
    {
        qId: "1",
        equation: "Which of the following are prime numbers?",
        options: ["9", "5", "17", "25", "33"],
        correctAnswer: ["5", "17"],
        userAnswer: [],
        isFlag: false,
        isVisited: false,
        noOfAttempt: "4",
        qStatus: "notAttempt",

    },
    {
        qId: "2",
        equation: " Identify the countries that are part of the Scandinavian region.",
        options: ["Finland", "Denmark", "Iceland", "Poland", "Sweden"],
        correctAnswer: ["Finland", "Denmark", "Iceland","Sweden"],
        userAnswer: [],
        isFlag: false,
        isVisited: false,
        noOfAttempt: "4",
        qStatus: "notAttempt",

    },
    {
        qId: "3",
        equation: " Select the programming languages that are classified as object-oriented.",
        options: ["Python", "C++", "Java", "HTML", "CSS"],
        correctAnswer: ["C++", "Java"],
        userAnswer: [],
        isFlag: false,
        isVisited: false,
        noOfAttempt: "4",
        qStatus: "notAttempt",

    },
    {
        qId: "4",
        equation: " Choose the elements that make up the halogens in the periodic table. Select all that apply.",
        options: ["Fluorine", "Chlorine", "Bromine", "Iodine", "Helium"],
        correctAnswer: ["Fluorine", "Chlorine", "Bromine", "Iodine"],
        userAnswer: [],
        isFlag: false,
        isVisited: false,
        noOfAttempt: "4",
        qStatus: "notAttempt",

    },
    {
        qId: "5",
        equation: "Select the literary works written by William Shakespeare.",
        options: ["The Odyssey", "Romeo and Juliet", "To Kill a Mockingbird", "Macbeth", "Pride and Prejudice"],
        correctAnswer: ["Romeo and Juliet", "Macbeth"],
        userAnswer: [],
        isFlag: false,
        isVisited: false,
        noOfAttempt: "4",
        qStatus: "notAttempt",

    },

]


