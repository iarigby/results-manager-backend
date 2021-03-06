module.exports = {
    new_file: {
        subject: (id, notification) =>
            `${id}: ${notification.type} დაემატა გამოცდების ნაშრომებს საგანში ${notification.subject}`
        ,
        body: (url, notification) =>
            `თქვენს ნაშრომს ახალი ფაილები დაემატა.
            სერვერი დროებით გაფუჭებულია, გწერთ მხოლოდ სახელებს. ნაპოვნია:
            ${notification.exam}        
        
        `
        /* 
        ფაილების და დეტალების ნახვა შეგიძლიათ ბმულზე 
        ${url}
        თუ გვერდზე რაიმე შეცდომა დაფიქსირდა, გთხოვთ უპასუხოთ ამ მეილს.
        */
    }
}