
jQuery(document).ready(function() {
    // Call the backstretch function on the specified div
    $("#custom-background").backstretch([
        "assets/images/background/backgroundsumut1.png",
        "assets/images/background/backgroundsumut2.png",
        "assets/images/background/backgroundsumut3.png",
        "assets/images/background/backgroundsumut4.png"
    ], {
        duration: 3000,  // Transition duration in milliseconds
        fade: 750       // Fade speed in milliseconds
    });
});
