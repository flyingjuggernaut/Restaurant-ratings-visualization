$.getJSON("AArestaurants.json", function(data) {

  var sortedRestaurants = data[0].businesses.sort((a,b) => b.rating - a.rating);
  let restaurantNames = (sortedRestaurants.map(d => d.name)).slice(1,15);
  let restaurantRatings = (sortedRestaurants.map(d => d.rating)).slice(1,15);
  let cuisines = [];

  data[0].businesses.forEach(function(d){
    if (d.categories) {
      d.categories.forEach(function(c){
        if (!cuisines.includes(c.title)) {
          cuisines.push(c.title);
        }
      })
    }
  })

  const sortedCuisines = cuisines.sort();
  const cuisineFilter = document.getElementById("cuisines");

  sortedCuisines.forEach(function(c) {
    const newC = document.createElement("option");
    newC.innerHTML = "<option value=" + c + ">"+ c + "</option>";
    cuisineFilter.appendChild(newC);
  })

  var chart = c3.generate({
    bindto: '#chart',
    data: {
        json: {
            'Ratings': restaurantRatings
        },
        type:'bar',
        colors: {
          Ratings: '#edf8fb',
      },
    },
    bar: {
        width: {
            ratio: 0.5
    }},
      axis: {
        x: {
          type: 'category',
          categories: restaurantNames,
          tick: {
            rotate: 45,
            multiline: false
          }
        }
      },
      tooltip: {
      format: {
          title: function (d) {
            var cuisineTooltipData = [];
              sortedRestaurants[d].categories.forEach(function(element){
                //console.log(element.title);
                cuisineTooltipData.push(element.title);
            });
            return 'Cuisines: '+cuisineTooltipData;
          }
        }

      },
      legend: {
      show: false
  }
  });

  for(let i=0;i<15;i++)
  {
    console.log(sortedRestaurants[i].price);

    if(sortedRestaurants[i].price=='$')
    {
      d3.select(".c3-bar-"+i).style("fill", "rgb(178, 226, 226)");
    }
    else if(sortedRestaurants[i].price=='$$')
    {
      d3.select(".c3-bar-"+i).style("fill", "rgb(102, 194, 164)");
    }
    else if(sortedRestaurants[i].price=='$$$')
    {
      d3.select(".c3-bar-"+i).style("fill", "rgb(44, 162, 95)");
    }
    else
    {
      d3.select(".c3-bar-"+i).style("fill", "rgb(0, 109, 44)");
    }

  }

  cuisineFilter.onchange = function(e) {
    //console.log(e.target.value);
    let selectedCuisine = e.target.value;
    let filteredRestaurants = [];
    sortedRestaurants.forEach(function(element){
        element.categories.forEach(function(element2)
        {
            if(element2.title==selectedCuisine){
              filteredRestaurants.push(element);
            }
        });
    });

   var top15filteredRestaurants = filteredRestaurants.slice(0,15);
   var filteredRestaurantNames = top15filteredRestaurants.map(d => d.name);
   var filteredrestaurantRatings = top15filteredRestaurants.map(d => d.rating);

    //console.log(filteredRestaurantNames);
    //console.log(filteredrestaurantRatings);


    var chart = c3.generate({
      bindto: '#chart',
      data: {
          json: {
              'Ratings': filteredrestaurantRatings
          },
          type:'bar',
          colors: {
            Ratings: '#edf8fb',
        },
      },
        bar: {
            width: {
                ratio: 0.5
        }},
        axis: {
          x: {
            type: 'category',
            categories: filteredRestaurantNames,
                tick: {
                  rotate: 45,
                  multiline: false
                }
          }
        },
        tooltip: {
        format: {
            title: function (d) {
              var cuisineTooltipData = [];
                top15filteredRestaurants[d].categories.forEach(function(element){
                  //console.log(element.title);
                  cuisineTooltipData.push(element.title);
              });
              return 'Cuisines: '+cuisineTooltipData;
            }
          }

        },
        legend: {
        show: false
    }
});

    for(let i=0;i<top15filteredRestaurants.length;i++)
    {
      console.log(top15filteredRestaurants[i].price);

      if(top15filteredRestaurants[i].price=='$')
      {
        d3.select(".c3-bar-"+i).style("fill", "rgb(178, 226, 226)");
      }
      else if(top15filteredRestaurants[i].price=='$$')
      {
        d3.select(".c3-bar-"+i).style("fill", "rgb(102, 194, 164)");
      }
      else if(top15filteredRestaurants[i].price=='$$$')
      {
        d3.select(".c3-bar-"+i).style("fill", "rgb(44, 162, 95)");
      }
      else
      {
        d3.select(".c3-bar-"+i).style("fill", "rgb(0, 109, 44)");
      }

    }
  };


});
