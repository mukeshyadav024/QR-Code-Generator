

        let imgbox = document.getElementById("imgbox");
        let qrimg = document.getElementById("qrimg");
        let qrtext = document.getElementById("qrtext");
        let generate = document.getElementById("generate");
        let download = document.getElementById("download");

        async function generateQR() {
            if (qrtext.value.length > 0) {
                const qrCodeUrl = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + encodeURIComponent(qrtext.value);

                // Set the image source to display the QR code
                qrimg.src = qrCodeUrl;
                qrimg.classList.add("show");
                download.classList.remove("hidden");
                

                download.addEventListener("click",async()=>{


                  
                        const response = await fetch(qrimg.src);
                        const blob = await response.blob();  // Convert the image to a Blob
                        const objectURL = URL.createObjectURL(blob);
                        let a = document.createElement("a")
                        // Set the href of the download link to the object URL of the Blob
                        a.href = objectURL;
                        a.download = "qrcode.jpg"
                        a.click()
                         // Show the download link
                     
                
                    
                })
           
               

            } else {
                // Reset if input is empty
                qrimg.src = "";
                qrimg.classList.remove("show");
                download.classList.add("hidden");
                qrtext.classList.add("error");

                setTimeout(() => {
                    qrtext.classList.remove("error");
                }, 1000);
            }
            
            
        }

        generate.addEventListener("click", generateQR);
        qrtext.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                generateQR();
            }
        });
      