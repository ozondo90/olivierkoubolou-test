const doctorsAppLoader = {
  dataTableList: document.getElementById("dataTableList"),
  paginationControls: document.getElementById("paginationControls"),
  totalItemsTag: document.getElementById("totalItems"),
  paginationSetterBtn: document.getElementById("paginationSetter"),

  jsonApi: "../../doctors.json",

  itemsPerPage: 10, // Define the number of items per page
  currentPage: 1, // Define the current page by default
  totalPages: 0,
  doctorDatas: [],

  formatTableEntrie: (entrieDatas, index) => {
    const newRow = `<tr class="dark:border-gray-700 bg-white dark:bg-gray-800 border-b">
                          <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                            ${entrieDatas["Nom"]}
                          </th>
                          <td class="px-6 py-4">
                            ${entrieDatas["Prénom"]}
                          </td>
                          <td class="px-6 py-4">
                            ${entrieDatas["Rue"]}
                          </td>
                          <td class="px-6 py-4">
                            ${entrieDatas["Code_postal"]}
                          </td>
                          <td class="px-6 py-4">
                            ${entrieDatas["Localité"]}
                          </td>
                          <td class="px-6 py-4">
                            ${entrieDatas["Téléphone"]}
                          </td>
                          <td class="text-right flex justify-start py-1">
                              <a href="#${index}" class="bg-[#00a5dd] hover:bg-gray-800 text-xs px-2 py-3 lg:px-3 lg:py-2 lg:text-base rounded-lg font-medium text-white dark:text-blue-500">En savoir plus</a>
                          </td>
                      </tr>`;

    return newRow;
  },

  addEntrieToTable: (newEntrie) => {
    if (dataTableList) {
      dataTableList.insertAdjacentHTML("beforeend", newEntrie);
    }
  },

  createPaginationControls: () => {
    const paginationControls = document.getElementById("paginationControls");
    doctorsAppLoader.totalItemsTag.textContent =
      doctorsAppLoader.doctorDatas.length;
    if (paginationControls) {
      paginationControls.innerHTML = "";

      const previousButton = document.createElement("li");
      previousButton.innerHTML = `<a href="#" class="flex justify-center items-center border-gray-300 dark:border-gray-700 bg-white hover:bg-gray-100 dark:hover:bg-gray-700 dark:bg-gray-800 ml-0 px-3 py-1.5 border rounded-l-lg h-full text-gray-500 hover:text-gray-700 dark:hover:text-white dark:text-gray-400">
                                    <span class="sr-only">Previous</span>
                                    <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                      <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                                    </svg>
                                  </a>`;
      previousButton.addEventListener("click", (e) => {
        e.preventDefault();
        if (doctorsAppLoader.currentPage > 1) {
          doctorsAppLoader.currentPage--;
          doctorsAppLoader.paginateDataSet(
            doctorsAppLoader.currentPage,
            doctorsAppLoader.itemsPerPage
          );
        }
      });
      paginationControls.appendChild(previousButton);

      for (let i = 1; i <= doctorsAppLoader.totalPages; i++) {
        if (i <= 3) {
          const pageButton = document.createElement("li");
          pageButton.innerHTML = `<a href="#" class="flex justify-center items-center border-gray-300 dark:border-gray-700 ${
            i === doctorsAppLoader.currentPage
              ? "bg-primary-50 dark:bg-gray-700 text-primary-600"
              : "bg-white hover:bg-gray-100 dark:hover:bg-gray-700 dark:bg-gray-800 text-gray-500"
          } px-3 py-2 border text-sm hover:text-gray-700 dark:hover:text-white dark:text-gray-400 leading-tight">
                                    ${i}
                                  </a>`;
          pageButton.addEventListener("click", (e) => {
            e.preventDefault();
            doctorsAppLoader.currentPage = i;
            doctorsAppLoader.paginateDataSet(
              doctorsAppLoader.currentPage,
              doctorsAppLoader.itemsPerPage
            );
          });
          paginationControls.appendChild(pageButton);
        } else if (i == 4) {
          const moreButton = document.createElement("li");
          moreButton.innerHTML = `<a href="#" class="flex justify-center items-center border-gray-300 dark:border-gray-700 ${
            i === doctorsAppLoader.currentPage
              ? "bg-primary-50 dark:bg-gray-700 text-primary-600"
              : "bg-white hover:bg-gray-100 dark:hover:bg-gray-700 dark:bg-gray-800 text-gray-500"
          } px-3 py-2 border text-sm hover:text-gray-700 dark:hover:text-white dark:text-gray-400 leading-tight"> ... 
                                  </a>`;
          paginationControls.appendChild(moreButton);
        } else if (i == 5) {
          const upToButton = document.createElement("li");
          upToButton.innerHTML = `<a href="#" class="flex justify-center items-center border-gray-300 dark:border-gray-700 ${
            i === doctorsAppLoader.currentPage
              ? "bg-primary-50 dark:bg-gray-700 text-primary-600"
              : "bg-white hover:bg-gray-100 dark:hover:bg-gray-700 dark:bg-gray-800 text-gray-500"
          } px-3 py-2 border text-sm hover:text-gray-700 dark:hover:text-white dark:text-gray-400 leading-tight">
                                  ${doctorsAppLoader.totalPages}
                                                          </a>`;
          paginationControls.appendChild(upToButton);

          upToButton.addEventListener("click", (e) => {
            e.preventDefault();
            doctorsAppLoader.currentPage = doctorsAppLoader.totalPages;
            doctorsAppLoader.paginateDataSet(
              doctorsAppLoader.currentPage,
              doctorsAppLoader.itemsPerPage
            );
          });
        }
      }

      const nextButton = document.createElement("li");
      nextButton.innerHTML = `<a href="#" class="flex justify-center items-center border-gray-300 dark:border-gray-700 bg-white hover:bg-gray-100 dark:hover:bg-gray-700 dark:bg-gray-800 px-3 py-1.5 border rounded-r-lg h-full text-gray-500 hover:text-gray-700 dark:hover:text-white dark:text-gray-400 leading-tight">
                                <span class="sr-only">Next</span>
                                <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                                </svg>
                              </a>`;
      nextButton.addEventListener("click", (e) => {
        e.preventDefault();
        if (doctorsAppLoader.currentPage < doctorsAppLoader.totalPages) {
          doctorsAppLoader.currentPage++;
          doctorsAppLoader.paginateDataSet(
            doctorsAppLoader.currentPage,
            doctorsAppLoader.itemsPerPage
          );
        }
      });
      paginationControls.appendChild(nextButton);
    }
  },

  paginateDataSet: (fromPage, items) => {
    if (dataTableList) {
      // Clear the existing table rows
      doctorsAppLoader.dataTableList.innerHTML = "";

      const start = (fromPage - 1) * doctorsAppLoader.itemsPerPage;
      const end = start + doctorsAppLoader.itemsPerPage;
      const paginatedItems = doctorsAppLoader.doctorDatas.slice(start, end);

      paginatedItems.forEach((item, index) => {
        const newRow = doctorsAppLoader.formatTableEntrie(item, start + index);
        doctorsAppLoader.addEntrieToTable(newRow);
      });

      // doctorsAppLoader.createPaginationControls();
    }
  },

  fetchDoctorsList: async () => {
    const result = await fetch(doctorsAppLoader.jsonApi)
      .then((response) => response.json())
      .then((datas) => {
        doctorsAppLoader.doctorDatas = datas;
      })
      .catch((error) => {
        console.log("Error on fetching: ", error);
      });
  },

  loadDoctorsList: () => {
    if (doctorsAppLoader.doctorDatas.length > 0) {
      // Calculate total pages based on table data
      doctorsAppLoader.totalPages = Math.ceil(
        doctorsAppLoader.doctorDatas.length / doctorsAppLoader.itemsPerPage
      );

      // Generate pagination controles
      doctorsAppLoader.createPaginationControls();

      // Display datas in table
      doctorsAppLoader.paginateDataSet(
        doctorsAppLoader.currentPage,
        doctorsAppLoader.itemsPerPage
      );
    }
  },

  searchDoctor: async () => {
    // Fetching the doctor list
    await doctorsAppLoader.fetchDoctorsList();

    // Fetching the current search input values
    const searchNameInput = document
      .getElementById("searchName")
      .value.trim()
      .toLowerCase();
    const searchLocationInput = document
      .getElementById("searchLocation")
      .value.trim()
      .toLowerCase();
    const searchPostalCodeInput = document
      .getElementById("searchPostalCode")
      .value.trim()
      .toLowerCase();
    const searchPhoneInput = document
      .getElementById("searchPhone")
      .value.trim()
      .toLowerCase();

    // Filtering the doctor data based on search criteria
    doctorsAppLoader.doctorDatas = doctorsAppLoader.doctorDatas.filter(
      (doctor) => {
        const nameMatches =
          !searchNameInput ||
          doctor["Nom"].toLowerCase().includes(searchNameInput) ||
          doctor["Prénom"].toLowerCase().includes(searchNameInput);

        const locationMatches =
          !searchLocationInput ||
          doctor["Localité"].toLowerCase().includes(searchLocationInput);

        const postalCodeMatches =
          !searchPostalCodeInput ||
          doctor["Code_postal"].toLowerCase() === searchPostalCodeInput;

        const phoneMatches =
          !searchPhoneInput ||
          doctor["Téléphone"].toLowerCase().includes(searchPhoneInput);

        console.log(postalCodeMatches);

        return (
          nameMatches && locationMatches && postalCodeMatches && phoneMatches
        );
      }
    );

    // Load doctors list
    doctorsAppLoader.loadDoctorsList();
  },

  searchDoctorWithKeyword: async () => {
    // Fetching the doctor list
    await doctorsAppLoader.fetchDoctorsList();

    // Fetching the current search input values
    const searchNameInput = document
      .getElementById("searchKeyword")
      .value.trim()
      .toLowerCase();

    // Filtering the doctor data based on search criteria
    doctorsAppLoader.doctorDatas = doctorsAppLoader.doctorDatas.filter(
      (doctor) => {
        const nameMatches =
          doctor["Nom"].toLowerCase().includes(searchNameInput) ||
          doctor["Prénom"].toLowerCase().includes(searchNameInput);

        return nameMatches;
      }
    );

    // Load doctors list
    doctorsAppLoader.loadDoctorsList();
  },

  setItemsPerPage: () => {
    doctorsAppLoader.itemsPerPage = parseInt(
      doctorsAppLoader.paginationSetterBtn.value.trim()
    );
  },
};

document.addEventListener("DOMContentLoaded", async () => {
  await doctorsAppLoader.fetchDoctorsList();
  doctorsAppLoader.loadDoctorsList();

  document.getElementById("searchButton").addEventListener("click", () => {
    doctorsAppLoader.searchDoctor();
  });

  document.getElementById("searchKeyword").addEventListener("keyup", () => {
    doctorsAppLoader.searchDoctorWithKeyword();
  });

  // setting the items per page
  doctorsAppLoader.paginationSetterBtn.addEventListener("change", () => {
    doctorsAppLoader.setItemsPerPage();
    doctorsAppLoader.loadDoctorsList();
  });
});
