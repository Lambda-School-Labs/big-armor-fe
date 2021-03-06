import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import NavBar from "../components/NavBar";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_dark from "@amcharts/amcharts4/themes/dark";

am4core.useTheme(am4themes_dark);
am4core.useTheme(am4themes_animated);
function animateBullet(bullet: any) {
  let duration = 3000 * Math.random() + 2000;
  let animation = bullet.animate(
    [{ property: "locationX", from: 0, to: 1 }],
    duration
  );
  animation.events.on("animationended", function (event: any) {
    animateBullet(event.target.object);
  });
}
function Home() {
  useEffect(() => {
    let chart = am4core.create("chartdiv", am4charts.ChordDiagram);

    chart.data = [
      { from: "Identity Hate", to: "Severe", value: 10 },
      { from: "Insult", to: "Severe", value: 8 },
      { from: "Insult", to: "Threat", value: 4 },
      { from: "Insult", to: "Toxic", value: 2 },
      { from: "Toxic", to: "Threat", value: 14 },
      { from: "Threat", to: "Severe", value: 8 },
      { from: "Toxic", to: "Identity Hate", value: 4 },
      { from: "Obscene", to: "Identity Hate", value: 7 },
      { from: "Severe", to: "Insult", value: 1 },
    ];
    chart.dataFields.color = "white";
    chart.dataFields.fromName = "from";
    chart.dataFields.toName = "to";
    chart.dataFields.value = "value";

    // make nodes draggable
    let nodeTemplate = chart.nodes.template;
    nodeTemplate.readerTitle = "Click to show/hide or drag to rearrange";
    nodeTemplate.showSystemTooltip = false;

    let nodeLink = chart.links.template;
    let bullet = nodeLink.bullets.push(new am4charts.CircleBullet());
    bullet.fillOpacity = 1;
    bullet.circle.radius = 5;
    bullet.locationX = 0.5;
    // create animations
    chart.events.on("ready", function () {
      for (var i = 0; i < chart.links.length; i++) {
        // @ts-ignore
        let link = chart.links.getIndex(i);
        // @ts-ignore
        let bullet = link.bullets.getIndex(0);

        animateBullet(bullet);
      }
    });
  });
  //onClick function to route to TryIt component
  return (
    <div>
      <NavBar backgroundTransparent={true} />
      <div className="topView">
        <div>
          <div className="welcomeTop">
            <div className="taglineContainer">
              <div>
                <p className="tagline1">
                  <span className="taglineHighlight">Detect</span>{" "}
                  <span className="taglineSpan">toxic language early.</span>
                </p>
              </div>
              <div>
                <p className="tagline2">
                  <span className="taglineHighlight">Prevent</span>{" "}
                  <span className="taglineSpan">harmful outcomes.</span>
                </p>
              </div>
              <Button
                className="topButton"
                variant="contained"
                color="secondary"
                component={Link}
                to="/try-it"
              >
                Try it out
              </Button>
            </div>
            <div id="chartdiv" style={{ width: "490px", height: "50vh" }}></div>
          </div>
        </div>
        <section id="movingBanner">
          <div>
            <h2 className="bannerText">
              This API is hosted on:
            </h2>
            <img className='bannerText' height='150px' width='175px' src='https://www.thesoftwarereport.com/wp-content/uploads/2019/02/google-cloud.jpg' alt='google' />
          </div>
        </section>
      </div>
      <div className="example">
        <div className="summaryBox1">
          <p className="summOne">
            In many environments encountered by professionals such as social workers or doctors, it's hard to immediately identify and address concerning behavior in their charges or colleagues, such as:
            <ul>
              <li>Bullying behavior</li>
              <li>Other kinds of toxic behavior</li>
            </ul>
            To accomplish this our model will have a text embedder to convert the input text into a usable vector; most likely some neural network embedder. At that point, it will be fit into a classifier, most likely one specialized for imbalanced data, such as balanced binning.
          </p>
          <div className="productImageContainer">
            <img
              className="productImage1"
              src="https://i.imgur.com/A3P7VaY.jpg"
              alt="written computer code diplayed on monitor"
            />
          </div>
        </div>
      </div>
      <Grid container spacing={3} className="gContainer">
        <Grid item xs className="gItem">
          <Paper elevation={3} className="content">
            Big Armor quickly evaluates submitted text for toxicity levels,
            allowing you to detect toxic or harmful language.
          </Paper>
        </Grid>
        <Grid item xs className="gItem">
          <Paper elevation={3} className="content">
            Detect and prevent online bullying and hate speech in online social
            media platforms or forums you manage.
          </Paper>
        </Grid>
        <Grid item xs className="gItem">
          <Paper elevation={3} className="content">
            Discover negative employee or customer feedback faster with Big
            Armor, helping you efficiently improve your workspace or product
          </Paper>
        </Grid>
      </Grid>
      <div className="bottomHomePage">
        <Button
          className="bottomButton"
          variant="contained"
          color="secondary"
          component={Link}
          to="/try-it"
        >
          Try it out
        </Button>
      </div>
      <NavBar backgroundTransparent={true} />
    </div>
  );
}

export default Home;
