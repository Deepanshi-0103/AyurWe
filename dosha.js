document.getElementById("quizForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Collect answers from the form
    let bodyFrame = document.querySelector('input[name="bodyFrame"]:checked')?.value;
    let digestion = document.querySelector('input[name="digestion"]:checked')?.value;
    let energy = document.querySelector('input[name="energy"]:checked')?.value;
    let coldWeather = document.querySelector('input[name="coldWeather"]:checked')?.value;
    let sleep = document.querySelector('input[name="sleep"]:checked')?.value;
    let stress = document.querySelector('input[name="stress"]:checked')?.value;

    // Determine dosha
    let doshaScores = { Vata: 0, Pitta: 0, Kapha: 0 };

    // Tally scores based on user input
    if (bodyFrame) doshaScores[bodyFrame]++;
    if (digestion) doshaScores[digestion]++;
    if (energy) doshaScores[energy]++;
    if (coldWeather) doshaScores[coldWeather]++;
    if (sleep) doshaScores[sleep]++;
    if (stress) doshaScores[stress]++;

    // Find the dosha with the highest score
    let dosha = Object.keys(doshaScores).reduce((a, b) => doshaScores[a] > doshaScores[b] ? a : b);

    // Display results
    let doshaName = document.getElementById("doshaName");
    let doshaDesc = document.getElementById("doshaDesc");
    let recommendations = document.getElementById("recommendations");

    doshaName.textContent = dosha;
    doshaDesc.textContent = getDoshaDescription(dosha);
    recommendations.innerHTML = getLifestyleRecommendations(dosha).map(item => `<li>${item}</li>`).join("");

    // Hide the form and show the result
    document.getElementById("quizForm").style.display = "none";
    document.getElementById("result").style.display = "block";
});

function getDoshaDescription(dosha) {
    const descriptions = {
        Vata: "Vata is characterized by a dry, light, and cool nature. You may have a thin frame, irregular digestion, and variable energy. You tend to feel cold easily and may have light sleep.",
        Pitta: "Pitta is characterized by a hot, sharp, and intense nature. You may have a medium build, strong digestion, and high energy. You tend to handle stress with irritability and have trouble sleeping occasionally.",
        Kapha: "Kapha is characterized by a heavy, slow, and cool nature. You may have a sturdy frame, slow digestion, and steady energy. You enjoy cold weather, sleep soundly, and handle stress with calmness but can become lethargic."
    };
    return descriptions[dosha];
}

function getLifestyleRecommendations(dosha) {
    const recommendations = {
        Vata: [
            "Follow a warm, moist, grounding diet.",
            "Practice yoga and gentle exercises.",
            "Ensure regular routines and rest.",
            "Avoid excessive cold environments and stay warm."
        ],
        Pitta: [
            "Avoid spicy, hot foods and excessive caffeine.",
            "Stay cool and relax in a calm environment.",
            "Exercise regularly but not too intensely.",
            "Practice stress management techniques like meditation."
        ],
        Kapha: [
            "Incorporate light, warm foods into your diet.",
            "Engage in stimulating activities and exercise.",
            "Avoid too much sleep and strive for activity.",
            "Try to stay active and avoid becoming stagnant."
        ]
    };
    return recommendations[dosha];
}
