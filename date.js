const today = new Date();
const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
};

module.exports = today.toLocaleDateString('en-US', options);

// const currentDay = today.getDay();
    // let day = "";
    // switch (currentDay) {
    //     case 0:
    //         day = "Sunday";
    //         break;
    //     case 1:
    //         day = "Monday";
    //         break;
    //     case 2:
    //         day = "Tuesday";
    //         break;
    //     case 3:
    //         day = "Wednesday";
    //         break;
    //     case 4:
    //         day = "Thursday";
    //         break;
    //     case 5:
    //         day = "Friday";
    //         break;
    //     case 6:
    //         day = "Saturday";
    //         break;
    //     default:
    //         console.log('error')
    // }