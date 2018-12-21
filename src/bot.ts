function startBot() {
  setInterval(function() {
    const date = new Date();
    console.log("hi1");
    if (date.getHours() === 13 && date.getMinutes() === 33) {
      console.log("hi2");
    }
  }, 1000);
}

export default startBot;
