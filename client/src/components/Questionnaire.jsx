import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPlan } from "../store/planSlice";
import Loading from "../components/Loading"; // Assuming you have a Loading component
import toast from "react-hot-toast";
import { BACKENDURL } from "../App";

const Questionnaire = () => {
    const [loading, setLoading] = useState(false); // State to handle loading
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmit = async (data) => {
        setLoading(true); // Set loading to true when the submission starts
        console.log(data);

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("Token is missing");
                alert("You are not logged in. Please log in first.");
                setLoading(false); // Set loading to false after error handling
                return;
            }

            const response = await axios.post(
                `${BACKENDURL}/plan/generate-plan`,
                data,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            console.log(response.data);
            dispatch(setPlan(response.data)); // Store the generated plan
            navigate("/generatedplans");
            toast.success("Plan generated successfully");
            // Navigate to the generated plans page
        } catch (error) {
            console.error("Error details:", error.response ? error.response.data : error.message);
            toast.error("Failed to generate plan");
        } finally {
            setLoading(false); // Set loading to false after request is done
        }
    };

    if (loading) {
        return <Loading />; // Show loading component when the form is submitting
    }

    return (
        <div className="flex flex-col items-center justify-center bg-transparent rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 w-[50%] text-white p-6 mx-auto">
            <h1 className="text-2xl font-bold mb-4">Questionnaire</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
                {/* Years of Experience */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Years of Experience</label>
                    <input
                        type="number"
                        {...register("experience", { required: "This field is required" })}
                        className="w-full bg-transparent rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 text-white py-2 px-2"
                        placeholder="e.g., 2"
                    />
                    {errors.experience && (
                        <p className="text-red-500 text-sm">{errors.experience.message}</p>
                    )}
                </div>

                {/* Role */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Role</label>
                    <input
                        type="text"
                        {...register("role", { required: "This field is required" })}
                        className="w-full bg-transparent rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 text-white py-2 px-2"
                        placeholder="e.g., Software Engineer"
                    />
                    {errors.role && (
                        <p className="text-red-500 text-sm">{errors.role.message}</p>
                    )}
                </div>

                {/* Job Title */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Target Job Title</label>
                    <input
                        type="text"
                        {...register("jobTitle", { required: "This field is required" })}
                        className="w-full bg-transparent rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 text-white py-2 px-2"
                        placeholder="e.g., Data Analyst"
                    />
                    {errors.jobTitle && (
                        <p className="text-red-500 text-sm">{errors.jobTitle.message}</p>
                    )}
                </div>

                {/* Target Companies */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Target Companies</label>
                    <input
                        type="text"
                        {...register("companies", { required: "This field is required" })}
                        className="w-full bg-transparent rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 text-white py-2 px-2"
                        placeholder="e.g., Google, Amazon"
                    />
                    {errors.companies && (
                        <p className="text-red-500 text-sm">{errors.companies.message}</p>
                    )}
                </div>

                {/* SQL Proficiency */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Current SQL Proficiency</label>
                    <select
                        {...register("sqlProficiency", { required: "This field is required" })}
                        className="w-full bg-transparent rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 text-white py-2 px-2"
                    >
                        <option className="w-full bg-transparent text-black" value="">Select proficiency</option>
                        <option className="w-full bg-transparent text-black" value="Beginner">Beginner</option>
                        <option className="w-full bg-transparent text-black" value="Intermediate">Intermediate</option>
                        <option className="w-full bg-transparent text-black" value="Advanced">Advanced</option>
                    </select>
                    {errors.sqlProficiency && (
                        <p className="text-red-500 text-sm">{errors.sqlProficiency.message}</p>
                    )}
                </div>

                {/* Preferred SQL Database */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Preferred SQL Database</label>
                    <select
                        {...register("dbSystem", { required: "This field is required" })}
                        className="w-full bg-transparent rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 text-white py-2 px-2"
                    >
                        <option className="w-full bg-transparent text-black" value="">Select database</option>
                        <option className="w-full bg-transparent text-black" value="MySQL">MySQL</option>
                        <option className="w-full bg-transparent text-black" value="PostgreSQL">PostgreSQL</option>
                        <option className="w-full bg-transparent text-black" value="Oracle">Oracle</option>
                        <option className="w-full bg-transparent text-black" value="SQL Server">SQL Server</option>
                    </select>
                    {errors.dbSystem && (
                        <p className="text-red-500 text-sm">{errors.dbSystem.message}</p>
                    )}
                </div>

                {/* Focus Area */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Focus Area</label>
                    <select
                        {...register("focusArea", { required: "This field is required" })}
                        className="w-full bg-transparent rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 text-white py-2 px-2"
                    >
                        <option className="w-full bg-transparent text-black" value="">Select focus area</option>
                        <option className="w-full bg-transparent text-black" value="Query Optimization">Query Optimization</option>
                        <option className="w-full bg-transparent text-black" value="Data Modeling">Data Modeling</option>
                        <option className="w-full bg-transparent text-black" value="ETL">ETL</option>
                        <option className="w-full bg-transparent text-black" value="Reporting">Reporting</option>
                    </select>
                    {errors.focusArea && (
                        <p className="text-red-500 text-sm">{errors.focusArea.message}</p>
                    )}
                </div>

                {/* Target SQL Skill Level */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Target SQL Skill Level</label>
                    <select
                        {...register("skillLevel", { required: "This field is required" })}
                        className="w-full bg-transparent rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 text-white py-2 px-2"
                    >
                        <option className="w-full bg-transparent text-black" value="">Select skill level</option>
                        <option className="w-full bg-transparent text-black" value="Beginner">Beginner</option>
                        <option className="w-full bg-transparent text-black" value="Intermediate">Intermediate</option>
                        <option className="w-full bg-transparent text-black" value="Advanced">Advanced</option>
                    </select>
                    {errors.skillLevel && (
                        <p className="text-red-500 text-sm">{errors.skillLevel.message}</p>
                    )}
                </div>

                {/* Focus Topics in SQL */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Focus Topics in SQL</label>
                    <input
                        type="text"
                        {...register("topics", { required: "This field is required" })}
                        className="w-full bg-transparent rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 text-white py-2 px-2"
                        placeholder="e.g., Joins, Subqueries, Indexing"
                    />
                    {errors.topics && (
                        <p className="text-red-500 text-sm">{errors.topics.message}</p>
                    )}
                </div>

                {/* SQL Query Complexity */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">SQL Query Complexity</label>
                    <select
                        {...register("queryComplexity", { required: "This field is required" })}
                        className="w-full bg-transparent rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 text-white py-2 px-2"
                    >
                        <option value="" className="w-full bg-transparent text-black">Select complexity</option>
                        <option value="Simple Queries" className="w-full bg-transparent text-black">Simple Queries</option>
                        <option value="Complex Queries" className="w-full bg-transparent text-black">Complex Queries</option>
                        <option value="Performance-heavy Queries" className="w-full bg-transparent text-black">Performance-heavy Queries</option>
                    </select>
                    {errors.queryComplexity && (
                        <p className="text-red-500 text-sm">{errors.queryComplexity.message}</p>
                    )}
                </div>

                {/* Target Industry */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Target Industry</label>
                    <input
                        type="text"
                        {...register("industry", { required: "This field is required" })}
                        className="w-full bg-transparent rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 text-white py-2 px-2"
                        placeholder="e.g., Healthcare, Finance"
                    />
                    {errors.industry && (
                        <p className="text-red-500 text-sm">{errors.industry.message}</p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-transparent rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 text-white py-2"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Questionnaire;
