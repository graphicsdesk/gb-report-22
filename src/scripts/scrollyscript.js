import scrollama from "scrollama";  
/**
 * Resizer script to toggle multiple artboards for responsiveness. Adapted from:
 * https://github.com/newsdev/ai2html/blob/gh-pages/_includes/resizer-script.html
*/
  
// using d3 for convenience
      var main = document.querySelector("main");
      var scrolly = main.querySelector("#scrolly");
      var sticky = scrolly.querySelector(".sticky-thing");
      var article = scrolly.querySelector("article");
      var steps = article.querySelectorAll(".step");

      // initialize the scrollama
      var scroller = scrollama();

      function opacityChange(){
        document.querySelectorAll("[data-name='redbars']").forEach(el=>{el.style.opacity=0;});
        document.querySelectorAll("[data-name='middlebars']").forEach(el=>{el.style.opacity=0;});
        //document.querySelectorAll("[data-name='redlegend']").forEach(el=>{el.style.opacity=0;});
        //document.querySelectorAll("[data-name='middlelegend']").forEach(el=>{el.style.opacity=0;});
        document.querySelectorAll("#rednums").forEach(el=>{el.style.opacity=0;});
        document.querySelectorAll("#middlenums").forEach(el=>{el.style.opacity=0;});
        document.querySelectorAll("[data-name='graybars']").forEach(el=>{el.style.opacity=0;});
        //document.querySelectorAll("[data-name='graylegend']").forEach(el=>{el.style.opacity=0;});
        document.querySelectorAll("#graynums").forEach(el=>{el.style.opacity=0;});
      }

      // scrollama event handlers
      function handleStepEnter(response) {
        // response = { element, direction, index }
        var el = response.element;
        if(response.index==0||response.index==1){
          opacityChange();
          document.querySelectorAll("[data-name='graybars']").forEach(el=>{el.style.opacity=1;});
          //document.querySelectorAll("[data-name='graylegend']").forEach(el=>{el.style.opacity=1;});
          document.querySelectorAll("#graynums").forEach(el=>{el.style.opacity=1;});
        }
        if(response.index==2){
          document.querySelectorAll("[data-name='middlebars']").forEach(el=>{el.style.opacity=1;});
          //document.querySelectorAll("[data-name='middlelegend']").forEach(el=>{el.style.opacity=1;});
          document.querySelectorAll("#middlenums").forEach(el=>{el.style.opacity=1;});
          document.querySelectorAll("#graynums").forEach(el=>{el.style.opacity=0;});
          document.querySelectorAll("#rednums").forEach(el=>{el.style.opacity=0;});
        }
        if(response.index==3){
          document.querySelectorAll("[data-name='redbars']").forEach(el=>{el.style.opacity=0;});
          document.querySelectorAll("#middlenums").forEach(el=>{el.style.opacity=1;});
          document.querySelectorAll("#rednums").forEach(el=>{el.style.opacity=0;});
        }
        if(response.index==4){
          document.querySelectorAll("[data-name='redbars']").forEach(el=>{el.style.opacity=1;});
          document.querySelectorAll("[data-name='middlebars']").forEach(el=>{el.style.opacity=1;});
          document.querySelectorAll("[data-name='graybars']").forEach(el=>{el.style.opacity=1;});
          //document.querySelectorAll("[data-name='redlegend']").forEach(el=>{el.style.opacity=1;});
          document.querySelectorAll("#rednums").forEach(el=>{el.style.opacity=1;});
          document.querySelectorAll("#middlenums").forEach(el=>{el.style.opacity=0;});
        }
        // remove is-active from all steps
        // then add is-active to this step
        steps.forEach(step => step.classList.remove('is-active'));
        el.classList.add('is-active');

        // update graphic based on step
        sticky.querySelector("p").innerText = el.dataset.step;
      }

      function init() {
        // 2. setup the scroller passing options
        // 		this will also initialize trigger observations
        // 3. bind scrollama event handlers (this can be chained like below)
        opacityChange();
        scroller
          .setup({
            step: "#scrolly article .step",
            offset: 0.6,
            debug: false
          })
          .onStepEnter(handleStepEnter);

        // setup resize event
        window.addEventListener("resize", scroller.resize);
      }

      // kick things off
      init();

