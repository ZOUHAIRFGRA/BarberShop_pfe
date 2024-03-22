import { Chart as ChartJS } from 'chart.js/auto'
import { useSelector } from 'react-redux'
import { Bar, Doughnut, Line } from 'react-chartjs-2'
function Statistics() {
  const appointmentsLenght = useSelector(
    (state) => state.barber.appointments,
  )

  const serviceCounts = []

  appointmentsLenght.forEach((appointment) => {
    const existingService = serviceCounts.find(
      (service) => service.name === appointment.service,
    )

    if (existingService) {
      existingService.count++
    } else {
      serviceCounts.push({ name: appointment.service, count: 1 })
    }
  })


  const services = useSelector((state) => state.barber.services)

  return (
    <>
      <div className="parentCard">
        <div className="dataCard nombreRendez-vous1">
          <Line
            data={{
              labels: services.map((serv) => serv.name),
              datasets: [
                {
                  label: 'nombre de chaque service',
                  data: serviceCounts.map((srv) => srv.count),
                  backgroundColor: [
                    'rgba(43, 63, 229, 0.8)',
                    'rgba(250, 192, 19, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(153, 102, 255, 0.8)',
                    'rgba(201, 203, 207, 0.8)',
                  ],
                  borderRadius: 2,
                },
              ],
            }}
          />
        </div>

        <div className="dataCard nombreRendez-vous2">
          <Bar
            data={{
              labels: services.map((serv) => serv.name),
              datasets: [
                {
                  label: 'nombre de chaque service',
                  data: serviceCounts.map((srv) => srv.count),
                  backgroundColor: [
                    'rgba(43, 63, 229, 0.8)',
                    'rgba(250, 192, 19, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(153, 102, 255, 0.8)',
                    'rgba(201, 203, 207, 0.8)',
                  ],
                  borderRadius: 2,
                },
              ],
            }}
          />
        </div>

        <div className="dataCard nombreRendez-vous3">
          <Doughnut
            data={{
              labels: services.map((serv) => serv.name),
              datasets: [
                {
                  label: 'nombre de chaque service',
                  data: serviceCounts.map((srv) => srv.count),
                  backgroundColor: [
                    'rgba(43, 63, 229, 0.8)',
                    'rgba(250, 192, 19, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(201, 203, 207, 0.8)',
                    'rgba(153, 102, 255, 0.8)',
                  ],
                },
              ],
            }}
          />
        </div>
      </div>
    </>
  )
}

export default Statistics
