const router = require('express').Router()
const backend = require('./kuzzle')
const email = require('./email')
const config = require('./config')
const students = require('./student')

const fetchDisputes = async function(id) {
    const data = await backend.get(id)
    const disputes = data._source.disputes || []
    return disputes;
}
const getDisputes = async function(req, res) {
    const id = req.params.studentid
    const disputes = await fetchDisputes(id)
    const unresolved = disputes.filter(e => {
        return e.status == 'unresolved'
    })
    res.send({ disputes: unresolved })
}

const createDispute = async function(req, res) {
    const id = req.params.studentid
    const data = req.body
    const disputes = await fetchDisputes(id)
    disputes.push({
        id: disputes.length + 1,
        info: data.info,
        type: data.type,
        status: "unresolved"
    })
    await backend.update(id, { disputes: disputes })
    await backend.refresh()
    res.send({ disputes: disputes })
    disputeNotify(data, id)
}

const disputeNotify = function(data, id) {
        const emailId = data.emailId
            // TODO
            // const emailAddress = `${emailId}@freeuni.edu.ge`
        const emailAddress = `marvinzem@gmail.com`
            // SNOOZED
        email.sendEmail(
            `${emailAddress}, ${config.email}`,
            `პარადიგმების მეორე შუალედური: ${emailId} გასაჩივრება`,
            `${data.info}\n${config.url}?id=${id}`)
    }
    // should maybe add resolution time + who resolved it
const resolveDispute = async function(req, res) {
    const id = req.params.studentid
    const disputeid = req.params.disputeid
    const old = await fetchDisputes(id)
    const disputes = old.map(dispute => updateDispute(dispute, disputeid))
    const data = { disputes: disputes }
    backend.update(id, data)
        .then(() => res.send(data))
}

const updateDispute = function(dispute, id) {
    if (dispute.id == id)
        dispute.status = "resolved"
    return dispute
}

router.get('/:studentid', getDisputes)
router.post('/:studentid/new', createDispute)
router.get('/:studentid/resolve/:disputeid', resolveDispute)

module.exports = router