const rollBtn = document.getElementById('rollBtn');
const resultText = document.getElementById('resultText');
const bonusModeCheckbox = document.getElementById('bonusMode');
const diceContainer = document.getElementById('diceContainer');

const stats = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };

function updateStatsUI() {
    for (let i = 1; i <= 6; i++) {
        document.getElementById(`stat${i}`).textContent = stats[i];
    }
}

bonusModeCheckbox.addEventListener('change', () => {
    if (bonusModeCheckbox.checked) {
        diceContainer.innerHTML = '<div class="die" id="die1">-</div><div class="die" id="die2">-</div><div class="die" id="die3">-</div>';
        rollBtn.textContent = 'Бросить кубики';
        resultText.textContent = 'Режим 3-х кубиков активен';
    } else {
        diceContainer.innerHTML = '<div class="die" id="die1">-</div>';
        rollBtn.textContent = 'Бросить кубик';
        resultText.textContent = 'Режим 1 кубика активен';
    }
    resultText.classList.remove('triplet');
});

rollBtn.addEventListener('click', () => {
    const getRandomDice = () => Math.floor(Math.random() * 6) + 1;
    resultText.classList.remove('triplet');

    if (!bonusModeCheckbox.checked) {
        const roll = getRandomDice();
        document.getElementById('die1').textContent = roll;
        stats[roll]++;
        updateStatsUI();

        if (roll % 2 === 0) {
            resultText.textContent = `Выпало: ${roll} (Чётное)`;
        } else {
            resultText.textContent = `Выпало: ${roll} (Нечётное)`;
        }
    } else {
        const roll1 = getRandomDice();
        const roll2 = getRandomDice();
        const roll3 = getRandomDice();

        document.getElementById('die1').textContent = roll1;
        document.getElementById('die2').textContent = roll2;
        document.getElementById('die3').textContent = roll3;

        stats[roll1]++;
        stats[roll2]++;
        stats[roll3]++;
        updateStatsUI();

        const sum = roll1 + roll2 + roll3;

        if (roll1 === roll2 && roll1 === roll3) {
            resultText.textContent = `🎉 Три одинаковых! Сумма: ${sum}`;
            resultText.classList.add('triplet');
        } else {
            resultText.textContent = `Сумма: ${sum}`;
        }
    }
});
