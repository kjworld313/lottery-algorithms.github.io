document.addEventListener("DOMContentLoaded", function() {
    // pity trackers 
    let click_count = 0;
    let pity_threshold = 20;
    let pity_upperbound = 30;


    // dictionary object
    const items = [
        {item_name: "Rainbow Star", probability: 0.003},
        {item_name: "Purple Star", probability: 0.005},
        {item_name: "Gold Star", probability: 0.037},
        {item_name: "Pink Star", probability: 0.050},
        {item_name: "Blue Star", probability: 0.231},
        {item_name: "Green Star", probability: 0.239},
        {item_name: "Brown Star", probability: 0.435}
    ];

    let length = items.length;

    // function to generate probability
    function generate_probability() {
        let probability = Math.random();

        if (click_count == pity_upperbound) {
            click_count = 0;
            
            if (probability < 0.5) {
                return items[0].item_name;
            } else {
                return items[1].item_name;
            }
        } else if (click_count >= pity_threshold) {
            for (let i = 0; i <= 3; i++) {
                items[i].probability += 0.005;
            }
        }

        return probability; // return a random number between 0 and 1
    }

    // function to retrieve prize
    function reward_prize(items) {
        let probability = generate_probability();
        let cur_probability = 0;

        for (const item of items) {
            cur_probability += item.probability
            if (probability < cur_probability) {
                return item.item_name;
            }
        }

        return items[length-1].item_name;
    }
    // gacha button listener
    const play_button = document.getElementById("play");
    const modal = new bootstrap.Modal(document.getElementById("exampleModal"));

    play_button.addEventListener("click", function () {
        ++click_count;
        const reward = reward_prize(items);
        const text = document.getElementById("prize");

        text.textContent = `Prize: ${reward}`;
        modal.show();
    });

})
