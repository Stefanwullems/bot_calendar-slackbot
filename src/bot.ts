function startBot() {
  setInterval(function() {
    const date = new Date();
    if (date.getHours() === 20 && date.getMinutes() === 0) {
      console.log("hi2");
    }
  }, 60000);
}

export default startBot;
