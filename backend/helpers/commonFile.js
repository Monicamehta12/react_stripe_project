function generateString(){
    const letter = "abcdefghijklmnopqrstuvwxyz";
    let otp = '';
    for(let i=1; i<= 6; i++){
      let index = Math.floor(Math.random() * (letter.length));
      otp = otp + letter[index];
    }
    return otp;
  }

module.exports = {
    generateString
}