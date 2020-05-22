var getUserMedia = require('getusermedia')
const video = document.querySelector('video')
const filter = document.querySelector('#filter')
const checkboxTheme = document.querySelector('#theme')
const messageInput = document.getElementById('yourMessage')
getUserMedia({ video: true, audio: false }, function (err, stream) {
  if (err) return console.error(err)

  var Peer = require('simple-peer')
  var peer = new Peer({
    initiator: location.hash === '#init',
    trickle: false,
    stream: stream
  })
  filter.addEventListener('change', (event) => {
    currentFilter = event.target.value
    video.style.filter = currentFilter
    SendFilter(currentFilter)
    event.preventDefault
})

  peer.on('signal', function (data) {
    document.getElementById('yourId').value = JSON.stringify(data)
  })

  document.getElementById('connect').addEventListener('click', function () {
    var otherId = JSON.parse(document.getElementById('otherId').value)
    peer.signal(otherId)
  })

  document.getElementById('send').addEventListener('click', function () {
    var yourMessage = document.getElementById('yourMessage').value
    peer.send(yourMessage)
    messageInput.value = ''
  })

  peer.on('data', function (data) {
    document.getElementById('messages').textContent += data + '\n'
  })

  peer.on('stream', function (stream) {
    var video = document.createElement('video')
   //video.setAttribute('class','embed-responsive-item')
    document.querySelector('#peerDiv').appendChild(video)

    video.srcObject = stream
    video.play()
  })
})
checkboxTheme.addEventListener('click', () => {
  if (checkboxTheme.checked == true) {
      document.body.style.backgroundColor = '#212529'
      if (document.querySelector('#muteText')) {
          document.querySelector('#muteText').style.color = "#fff"
      }

  }
  else {
      document.body.style.backgroundColor = '#fff'
      if (document.querySelector('#muteText')) {
          document.querySelector('#muteText').style.color = "#212529"
      }
  }
}
)
