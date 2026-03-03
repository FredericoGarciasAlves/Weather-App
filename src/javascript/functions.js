function switchHeat(heatMetric, heatImperial, checkmark, btnState) {
  heatMetric.forEach((element, index) => {
    // console.log(element.classList.contains("active-metric"));
    if (element.classList.contains("active-metric")) {
      element.classList.remove("active-metric");
      heatImperial[index].classList.add("active-imperial");

      // $checkmark[index].hidden = false;
    } else {
      element.classList.add("active-metric");
      heatImperial[index].classList.remove("active-imperial");
      // $checkmark[index] = true;
    }

    //   switch (element.classList.contains("active-two")) {
    //     case true:
    //       element.classList.toggle("active-two");
    //       break;
    //     case false:
    //       $heatMetric[index].classList.toggle("active-one");
    //       break;
    //   }
    // });
  });
  // console.log($heatMetric[0].classList.contains("active-metric"));
  if (heatMetric[0].classList.contains("active-metric")) {
    for (let i = 0; i < 6; i++) {
      checkmark[i].hidden = true;
    }
    for (let i = 0; i < 5; i = i + 2) {
      checkmark[i].hidden = false;
      console.log("disparando");
    }
  } else {
    for (let i = 0; i < 6; i++) {
      checkmark[i].hidden = false;
    }
    for (let i = 0; i < 5; i = i + 2) {
      checkmark[i].hidden = true;
    }
    console.log("disparando dobrado");
  }

  if (btnState.textContent === "Switch to Imperial") {
    btnState.textContent = "Switch to Metric";
  } else {
    btnState.textContent = "Switch to Imperial";
  }
}

export { switchHeat };
