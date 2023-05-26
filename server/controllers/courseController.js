const express = require('express');
const mongoose = require('mongoose');
const courseModel = require('../models/courseModel')
const studentModel = require('../models/studentModel')
exports.createCourse = async (req, res) => {

    try {
        const { title, capacity, available,descrip, sname, email,phone } = req.body;
        const student = new studentModel({
         
          sname,
          email,
          phone
        });
        const course = new courseModel({
              _id:new mongoose.Types.ObjectId(),
              title,
              capacity,
              available,
              descrip,
              students: [studentModel._id]       
          
        });
    
      
       
        await course.save();
        await student.save()
        res.status(201).json({ course, student,success: true });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
      }
}


exports.getAll = async (req, res) => {
    try {
        const dataStd = await courseModel.find()
            console.log(dataStd)
         
        res.status(200).send(dataStd)
    } catch (error) {
        res.status(404).send({ success: false, message: "not found" })
    }
}

exports.deleteCourse = async (req, res) => {
    try { 
        const { id } = req.params;
        await courseModel.findByIdAndDelete(id)
        res.status(200).send({ success: true, message: "deleted succesfully" })
    } catch (error) {
        res.status(400).send({ success: false, message: "can't be deleted" })
    }
}


exports.updateCourse = async (req, res) => {
    try {
        const id = req.body._id;
        const updatedStd = await courseModel.updateOne({ _id: id }, { $set: { ...req.body } })
        res.status(200).send({ success: true, message: updatedStd })
    } catch (error) {
        console.log(error)
        res.status(400).send({ success: false, message: "does not exist" })
    }
}