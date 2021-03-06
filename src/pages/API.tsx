import React, { Component } from "react";
import NavBar from "../components/NavBar";

export default class API extends Component {
  state = {
    whichSelect: 'Introduction',
  }
  isBottom(element: any) {
    return element.getBoundingClientRect().bottom <= window.innerHeight;
  }

  componentDidMount() {
    document.addEventListener('scroll', this.trackScrolling);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.trackScrolling);
  }


  trackScrolling = () => {
    const introElement = document.getElementById('intro');
    const preprocessingElement = document.getElementById('preprocessing');
    const requestElement = document.getElementById('requests');
    const modelElement = document.getElementById('model');
    const deployElement = document.getElementById('deploy');
    if (this.isBottom(introElement)) {
      this.setState({ whichSelect: 'Introduction' });
    }
    if (this.isBottom(preprocessingElement)) {
      this.setState({ whichSelect: 'preprocessing' });
    }
    if (this.isBottom(requestElement)) {
      this.setState({ whichSelect: 'requests' });
    }
    if (this.isBottom(modelElement)) {
      this.setState({ whichSelect: 'model' });
    }
    if (this.isBottom(deployElement)) {
      this.setState({ whichSelect: 'deploy' });
    }
  };
  render() {
    const { whichSelect } = this.state;
    return (
      <div>
        <NavBar backgroundTransparent={false} />
        <div className="navbarCoverWhiteSpace"></div>
        <div className="docsContainer">
          <div className="docsNav">
            <a
              // onClick={() => setWhichSelect("Introduction")}
              href="#intro"
              className={
                whichSelect === "Introduction" ? "selectedDoc" : "notSelectedDoc"
              }
            >
              Introduction
          </a>
            <a
              // onClick={() => setWhichSelect("preprocessing")}
              href="#preprocessing"
              className={
                whichSelect === "preprocessing" ? "selectedDoc" : "notSelectedDoc"
              }
            >
              Preprocessing
          </a>
            <a
              // onClick={() => setWhichSelect("requests")}
              href="#requests"
              className={
                whichSelect === "requests" ? "selectedDoc" : "notSelectedDoc"
              }
            >
              Making Requests
          </a>
            <a
              // onClick={() => setWhichSelect("model")}
              href="#model"
              className={
                whichSelect === "model" ? "selectedDoc" : "notSelectedDoc"
              }
            >
              Model
          </a>
            <a
              // onClick={() => setWhichSelect("deploy")}
              href="#deploy"
              className={
                whichSelect === "deploy" ? "selectedDoc" : "notSelectedDoc"
              }
            >
              Deploy
          </a>
          </div>
          <div className="textContainer">
            <div className="docSection" id="intro">
              <h1>
                The API uses FastAPI for{" "}
                <span
                  className="docsOpen"
                  onClick={() =>
                    window.open(
                      "https://fastapi.tiangolo.com/tutorial/first-steps/",
                      "_blank"
                    )
                  }
                >
                  documentation
              </span>
              </h1>
              <ul>
                <li>
                  uvicorn main:app will run the API locally. uvicorn can be
                  installed via pip.
              </li>
                <li>
                  going to the url for the api with /docs will allow one to see
                  the documentation and test requests.
              </li>
              </ul>
              <p>
                It is currently deployed through Google's Cloud Services: Google
              Cloud Storage and App-Engine:{" "}
                <span
                  onClick={() =>
                    window.open(
                      "https://cloud.google.com/appengine/docs",
                      "_blank"
                    )
                  }
                  className="docsOpen"
                >
                  documentation
              </span>
              </p>
            </div>
            <div className="docSection" id="preprocessing">
              <h2>Preprocessing</h2>
              <p>
                The API accepts string based requests and preprocesses the text
                before running it through the predictive model. During
                preprocessing, the following are removed:
            </p>
              <ul>
                <li>Newline characters</li>
                <li>Return characters</li>
                <li>Leading and trailing white spaces</li>
                <li>Usernames if indicated with the term 'User'</li>
                <li>IP addresses and user IDs</li>
                <li>Non-printable characters e.g. unicode</li>
              </ul>
              <p>
                Words that are disguised using characters such as * or @ are
                replaced with letters and common asterisk words are replaced with
                the appropriate word. The API also separates toxic words from
                surrounding text in case they are hidden within non-toxic content.
            </p>
            </div>{" "}
            <div className="docSection" id="requests">
              <h2>Making Requests</h2>
              <p>Example Request Body:</p>
              <p>"text": "I am an example string"</p>
            </div>
            <div className="docSection" id="model">
              <h2>Model</h2>
              <p>
                The model is used to determine if the text contains toxic or
                offensive content.
            </p>
              <p>The possible labels are:</p>
              <ul>
                <li>toxic</li>
                <li>severe toxic</li>
                <li>obscene</li>
                <li>threat</li>
                <li>insult</li>
                <li>identity hate</li>
              </ul>
              <p>
                The API returns the cleaned text, all labels, True of False for
                each label, and the predicted probability of each.
            </p>
              <p>
                The current model is a Bi-directional LSTM + GRU neural network
                made with PyTorch, assuming FastText vectorization. Considerable
                preprocessing is performed on the text before vectorization. The
                metrics used in evaluating this model are F1 and ROC-AUC scores.
            </p>
              <p>
                F1 score is defined as the harmonic mean between precision and
                recall on a scale of 0 to 1. Recall demonstrates how effectively
                this model identifies all relevant instances of toxicity.
                Precision demonstrates how effectively the model returns only
                these relevant instances.
            </p>
              <p>
                The AUC score represents the measure of separability, in this
                case, distinguishing between toxic and non-toxic content. Also on
                a scale of 0 to 1, a high AUC score indicates the model
                successfully classifies toxic vs non-toxic. The ROC represents the
                probability curve.
            </p>
              <p>
                The F1 score for this model is 0.753 and the ROC-AUC score is
                0.987
            </p>
            </div>{" "}
            <div className="docSection" id="deploy">
              <h2>Deploy</h2>
              <p>The following deployment instructions are for Google Cloud:</p>

              <ol id="deployList">
                <li id="deployList">Create a VM instance keeping in mind the amount of memory your model will need. (Make sure to allow http/https traffic)</li>

                <li id="deployList">Connect to the instance you created by clicking the SSH button.</li>

                <li id="deployList">Run command: gcloud init to specify username and project.</li>

                <li id="deployList">Clone the repository in the cloud shell.</li>

                <li id="deployList">Change directory to the repository.</li>

                <li id="deployList">Create a virtual environment (venv).</li>

                <li id="deployList">Connect to the virtual environment.</li>

                <li id="deployList">Install dependencies.</li>

                <li id="deployList">Deploy using code: uvicorn main:app --host 0.0.0.0</li>

                <li id="deployList"> Visit the api: http://YOUR-EXTERNAL-IP-ADDRESS:8000 (Your external IP address can be found in the console when navigating to the VM instance tab)</li>
.              </ol>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
