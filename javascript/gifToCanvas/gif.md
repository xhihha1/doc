

        var myGif = GIF();                  // creates a new gif  
        var myGif = new GIF();              // will work as well but not needed as GIF() returns the correct reference already.    
        myGif.load("myGif.gif");            // set URL and load
        myGif.onload = function(event){     // fires when loading is complete
                                            //event.type   = "load"
                                            //event.path   array containing a reference to the gif
        }
        myGif.onprogress = function(event){ // Note this function is not bound to myGif
                                            //event.bytesRead    bytes decoded
                                            //event.totalBytes   total bytes
                                            //event.frame        index of last frame decoded
        }
        myGif.onerror = function(event){    // fires if there is a problem loading. this = myGif
                                            //event.type   a description of the error
                                            //event.path   array containing a reference to the gif
        }

        Once loaded the gif can be displayed
        if(!myGif.loading){
            ctx.drawImage(myGif.image,0,0); 
        }
        // You can display the last frame loaded during loading

        if(myGif.lastFrame !== null){
            ctx.drawImage(myGif.lastFrame.image,0,0); 
        }


        // To access all the frames
        var gifFrames = myGif.frames; // an array of frames.

        // A frame holds various frame associated items.
        myGif.frame[0].image; // the first frames image
        myGif.frame[0].delay; // time in milliseconds frame is displayed for