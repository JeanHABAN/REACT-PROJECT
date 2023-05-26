
const trainerModel = require('../models/trainerModel')

exports.createTrainer = async (req, res) => {
    // const { tname, email, phone, photo, about } = req.body;
    const { tname, email, phone, photo, about } = req.body;
    console.log(" body  ", req.body)
   

        try {
        

            const trainer = new trainerModel({
                tname,
                email,
                phone,
                photo,
                about
            });

            const result = await trainer.save();

            res.status(201).send({trainer :result, success : true});
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Server Error' });
        }
    }


exports.getAll = async (req, res) => {
        try {
            const dataStd = await trainerModel.find({})
            res.status(200).send(dataStd)
        } catch (error) {
            res.status(404).send({ success: false, message: "not found" })
        }
    }

    exports.deleteTeacher = async (req, res) => {
        try {
            const { id } = req.params;
            await trainerModel.findByIdAndDelete(id)
            res.status(200).send({ success: true, message: "deleted succesfully" })
        } catch (error) {
            res.status(400).send({ success: false, message: "can't be deleted" })
        }
    }


    exports.updateTrainer = async (req, res) => {
        try {
            const id = req.body._id;
            const updatedStd = await trainerModel.updateOne({ _id: id }, { $set: { ...req.body } })
            res.status(200).send({ success: true, message: updatedStd })
        } catch (error) {
            console.log(error)
            res.status(400).send({ success: false, message: "does not exist" })
        }
    }
