do(app=angular.module('dataUrltoBlob',['myApp.lodash'])) ->

  app.factory 'DataUrlToBlob',(_) ->

    convert:(dataURL) ->

      console.log dataURL
      # Decode the dataURL
      binary = atob(dataURL.split(',')[1])

      #Create 8-bit unsigned array
      array=[]
      for i in [0..binary.length]
        array.push(binary.charCodeAt(i))

      # Return our Blob object
      new Blob([new Uint8Array(array)], {
        type: 'image/png'
      })







