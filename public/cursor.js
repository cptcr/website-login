document.addEventListener("mousemove", function(event) {
    var cursor = document.querySelector(".cursor");
    cursor.style.top = (event.pageY - 10) + "px"; // Adjust to center the cursor point
    cursor.style.left = (event.pageX - 10) + "px"; // Adjust to center the cursor point
});
  