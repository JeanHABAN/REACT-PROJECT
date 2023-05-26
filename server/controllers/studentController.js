const express = require('express');
const mongoose = require('mongoose');
const studentModel = require('../models/studentModel')
const courseModel = require('../models/courseModel')
const { ObjectId } = require('mongodb');
exports.createStudent = async (req, res) => {
    try {
      const { sname, email, phone, title, capacity, available,descrip} = req.body;

     const course =new courseModel({
        title,
        capacity,
        available,
        descrip,
     })
      const std = new studentModel({
        
        sname,
        email,
        phone,
        courses: [courseModel._id]    
      });
    //   await course.save()
      await std.save();
  
      res.status(201).json({ std , success: true});
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  

exports.getAll = async (req, res) => {
    try {
        const dataStd = await studentModel.find()
    
        res.status(200).send(dataStd)
    } catch (error) {
        res.status(404).send({ success: false, message: "not found" })
    }
}

exports.deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;
        await studentModel.findByIdAndDelete(id)
        res.status(200).send({ success: true, message: "deleted succesfully" })
    } catch (error) {
        res.status(400).send({ success: false, message: "can't be deleted" })
    }
}


exports.updateStudent = async (req, res) => {
    const courseId = req.body.courseid;
    const studentId = req.body.studentId;
    
    try {
        const findcourse = await courseModel.findById(courseId)
        const findstudent = await studentModel.findById(studentId)
        if(findcourse.available > 0){
        if(findcourse.students.find(std=> String(std)  === String(findstudent._id)) ||
           findstudent.courses.find(crs=> String(crs) === String(findcourse._id))){
           return res.status(401).json({message:"student already enrolled"});
        }else{
         await studentModel.findByIdAndUpdate({_id:new ObjectId(studentId)}, {$push: {courses:courseId} });
        await courseModel.findByIdAndUpdate({_id:new ObjectId(courseId)}, {$push: {students: studentId } , $inc:{available:-1}})
        res.status(200).send({message:"SUCCESSFULY  ADDED"})
        }
    }else{
        res.status(401).json({message:"class is full"});
    }
    } catch (error) {
        console.log(error)
        res.status(400).send({ success: false, message: "does not exist" })
    }
}
