<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12" lg="3">
                <material-stats-card
                    style="overflow: visible;"
                    color="green"
                    icon="mdi-store"
                    title="Revenue"
                    value="$34,245"
                    sub-icon="mdi-calendar"
                    sub-text="Last 24 Hours"
              />
            </v-col>
            <v-col cols="12" lg="3">
                <material-stats-card
                    style="overflow: visible;"
                    color="orange"
                    icon="mdi-content-copy"
                    title="Used Space"
                    value="49/50"
                    small-value="GB"
                    sub-icon="mdi-alert"
                    sub-icon-color="error"
                    sub-text="Get More Space..."
                    sub-text-color="text-primary"
                />
            </v-col>
            <v-col cols="12" lg="3">
                <material-stats-card
                    style="overflow: visible;"
                    color="red"
                    icon="mdi-information-outline"
                    title="Fixed Issues"
                    value="75"
                    sub-icon="mdi-tag"
                    sub-text="Tracked "
                />
            </v-col>
            <v-col cols="12" lg="3">
                <material-stats-card
                    style="overflow: visible;"
                    color="info"
                    icon="mdi-alert"
                    title="Report Issues"
                    value="245"
                    sub-icon="mdi-update"
                    sub-text="Just Updated"
                />
            </v-col>         


            <v-col cols="12" lg="4">
                <material-chart-card
                    style="overflow: visible;"
                    color="white"
                    type="Line"
                    :data="dailySalesChart.data"
                    :options="dailySalesChart.options"
                >
                    <h4 class="title font-weight-light">Daily Sales</h4>
                    <p class="category d-inline-flex font-weight-light">
                        <v-icon color="green" small>mdi-arrow-up</v-icon>
                        <span class="green--text">55%</span>
                        &nbsp; increase in today's sales
                    </p>

                    <template #actions>
                        <v-icon class="mr-2" small>mdi-clock-outline</v-icon>
                        <span class="caption grey--text font-weight-light">updated 4 minutes ago</span>
                    </template>
                </material-chart-card>
            </v-col>
            <v-col cols="12" lg="4">
                <material-chart-card
                    style="overflow: visible;"
                    :data="emailsSubscriptionChart.data"
                    :options="emailsSubscriptionChart.options"
                    color="white"
                    type="Bar"
                >
                    <h4 class="title font-weight-light">Email Subscription</h4>
                    <p class="category d-inline-flex font-weight-light">Last Campaign Performance</p>

                    <template #actions>
                        <v-icon class="mr-2" small>mdi-clock-outline</v-icon>
                        <span class="caption grey--text font-weight-light">updated 10 minutes ago</span>
                    </template>
                </material-chart-card>
            </v-col>
            <v-col cols="12" lg="4">
                <material-chart-card
                    style="overflow: visible;"
                    :data="dataCompletedTasksChart.data"
                    :options="dataCompletedTasksChart.options"
                    color="white"
                    type="Line"
                >
                    <h3 class="title font-weight-light">Completed Tasks</h3>
                    <p class="category d-inline-flex font-weight-light">Last Last Campaign Performance</p>

                    <template #actions>
                        <v-icon class="mr-2" small>mdi-clock-outline</v-icon>
                        <span class="caption grey--text font-weight-light">campaign sent 26 minutes ago</span>
                    </template>
                </material-chart-card>
            </v-col> 

            <v-col cols="12" lg="4">
                <material-chart-card
                    style="overflow: visible;"
                    color="white"
                    type="Line"
                    :data="SalesOptionsChart.data"
                    :options="SalesOptionsChart.options"
                >
                    <h4 class="title font-weight-light">Daily Sales</h4>
                    <p class="category d-inline-flex font-weight-light">
                        <v-icon color="green" small>mdi-arrow-up</v-icon>
                        <span class="green--text">55%</span>
                        &nbsp; increase in today's sales
                    </p>

                    <template #actions>
                        <v-icon class="mr-2" small>mdi-clock-outline</v-icon>
                        <span class="caption grey--text font-weight-light">updated 4 minutes ago</span>
                    </template>
                </material-chart-card>
            </v-col>


            <v-col cols="12" lg="4">
                <material-chart-card
                    style="overflow: visible;"
                    :data="DoughnutChart.data"
                    :options="DoughnutChart.options"
                    color="white"
                    type="Doughnut"
                >
                    <h3 class="title font-weight-light">Issues</h3>
                    <p class="category d-inline-flex font-weight-light">Last Issues Performance</p>

                    <template #actions>
                        <v-icon class="mr-2" small>mdi-clock-outline</v-icon>
                        <span class="caption grey--text font-weight-light">Today</span>
                    </template>
                </material-chart-card>
            </v-col>
            <v-col cols="12" lg="4">
                <material-chart-card
                    style="overflow: visible;"
                    :data="DoughnutChart.data"
                    :options="DoughnutChart.options"
                    color="white"
                    type="Pie"
                >
                    <h3 class="title font-weight-light">Issues</h3>
                    <p class="category d-inline-flex font-weight-light">Last Issues Performance</p>

                    <template #actions>
                        <v-icon class="mr-2" small>mdi-clock-outline</v-icon>
                        <span class="caption grey--text font-weight-light">Today</span>
                    </template>
                </material-chart-card>
            </v-col> 
        </v-row>
    </v-container>
</template>

<script>
export default {
  data() {
      return {
          dailySalesChart: {
              data: {
                  labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
                  datasets: [{ label: 'dailySales', data: [12, 17, 7, 17, 23, 18, 38], backgroundColor: 'rgba(75, 192, 192, 1)', borderColor: "rgba(75, 192, 192, 0.3)" }],
              },
              options: {
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                      legend: {
                          display: false,
                      },
                  },
              },
          },
          dataCompletedTasksChart: {
              data: {
                  labels: ['12am', '3pm', '6pm', '9pm', '12pm', '3am', '6am', '9am'],
                  datasets: [{ label: 'dataCompletedTasks', data: [230, 750, 450, 300, 280, 240, 200, 190], backgroundColor: 'rgba(255, 255, 14, 1)', borderColor: "rgba(255, 255, 14, 0.3)" }],
              },
              options: {
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                      legend: {
                          display: false,
                      },
                  },
              },
          },
          emailsSubscriptionChart: {
              data: {
                  labels: ['Ja', 'Fe', 'Ma', 'Ap', 'Mai', 'Ju', 'Jul', 'Au', 'Se', 'Oc', 'No', 'De'],
                  datasets: [
                      {
                          label: 'emailsSubscription',
                          data: [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],
                          backgroundColor: ['#36A2EB']
                      },
                  ],
              },
              options: {
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                      legend: {
                          display: false,
                      },
                  },
              },
          },
          DoughnutChart: {
            data: {
              labels: ['NuVue', 'VueJit', 'IftShi', 'KoinVi', 'MegsWear', 'Millgh'],
              datasets: [
                    {
                        label: 'Visualization',
                        data: [72, 131, 12, 3, 4, 55],
                        backgroundColor: [
                          '#FF6384',  // Color para 'NuVue'
                          '#36A2EB',  // Color para 'VueJit'
                          '#FFCE56',  // Color para 'IftShi'
                          '#4BC0C0',  // Color para 'KoinVi'
                          '#9966FF',  // Color para 'MegsWear'
                          '#FF9F40'   // Color para 'Millgh'
                        ]
                    },
                ],
            },
            options: {
              responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                      legend: {
                          display: true,
                          position: 'right',
                      },
                      tooltip: {
                        enabled: true 
                      }
                },
            },
          },
          SalesOptionsChart: {
              data: {
                  labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
                  datasets: [{ label: 'dailySales', data: [12, 17, 7, 17, 23, 18, 38], backgroundColor: 'rgba(75, 192, 192, 1)', borderColor: "rgba(75, 192, 192, 0.3)", tension: 0.4 }],
              },
              options: {
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                        position: "top",
                    },
                    tooltip: {
                        callbacks: {
                        label: function (tooltipItem) {
                            return tooltipItem.dataset.label + ": " + tooltipItem.raw;
                        },
                        },
                    },
                    },
                    scales: {
                    x: {
                        beginAtZero: true,
                    },
                    y: {
                        beginAtZero: true,
                    },
                    },
              },
          },


          tabs: 'one',
          list: [false, false, false, false, false, false],
      };
  },
  methods: {
      complete(index) {
          this.list[index] = !this.list[index];
      },
  },
};

definePageMeta({
    layout: "dashboard",
    middleware: "auth",
  });
</script>