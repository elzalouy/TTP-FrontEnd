import { Project } from "../../../src/interfaces/models/Projects";
import { Client } from "../../../src/redux/Clients/clients.state";

let projects: Cypress.Chainable<Cypress.AUTWindow>,
  projectsData: Project[] = [],
  clients: Client[] = [],
  status = [
    "Not Started",
    "deliver on time",
    "deliver before time",
    "late",
    "inProgress",
  ],
  date = ["asc", "desc"];

describe("Create Project", () => {
  // Arrange
  before(() => {
    // Act Before all
    cy.login("zed.saheer5@gmail.com", "12345678");
    //Arrange before all
    projects = cy.visit("/projects");
    // Act Before all
    cy.request({
      method: "GET",
      url: "http://localhost:5000/api/getProject",
    }).then((res: any) => {
      projectsData = res.body;
    });
    cy.request({
      method: "GET",
      url: "http://localhost:5000/api/getAllClients",
    }).then((res) => {
      clients = res.body;
    });
  });

  it("Should have four filter selectors", () => {
    //Arrange
    let filterOptions = projects.find("#filter-projects");
    //Act
    filterOptions.should("have.length", 4);
    // Assert
  });
  it(`Should filter by selected client id`, () => {
    // Act
    // let option = projects.find(`#${clients[0]._id}`).get("input");
    // Assert
    // expect(option).to.be.ok;
  });
});
