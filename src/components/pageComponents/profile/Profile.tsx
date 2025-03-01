"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetUserData } from "@/queries/userProfileQueries";
import { formSchema } from "@/utils/schema/userProfileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, PlusCircle, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";

interface UserDataType {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: "male" | "female" | "others";
  designation: string;
  skills: string[];
  email: string;
}

const Profile = () => {
  const [userData, setUserData] = useState<UserDataType | null>(null);
  const { data: userDataFetched, isPending } = useGetUserData();
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");

  // Initialize form with empty values
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      designation: "",
      skills: [] as string[],
      email: "",
      dateOfBirth: undefined,
      gender: undefined,
    },
  });

  useEffect(() => {
    if (userDataFetched) {
      const data = userDataFetched.data;
      setUserData({
        firstName: data.firstName,
        lastName: data.lastName,
        dateOfBirth: data.dateOfBirth && new Date(data.dateOfBirth),
        designation: data.designation,
        email: data.email,
        gender: data.gender,
        skills: data.skills || [],
      });

      form.reset({
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        designation: data.designation || "",
        skills: data.skills || [],
        email: data.email || "",
        dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : undefined,
        gender: data.gender,
      });

      setSkills(data.skills || []);
    }
  }, [userDataFetched, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Submit logic here
  }

  const addSkill = () => {
    if (newSkill.trim() !== "") {
      const updatedSkills = [...skills, newSkill.trim()];
      setSkills(updatedSkills);
      form.setValue("skills", updatedSkills);
      setNewSkill("");
    }
  };

  const removeSkill = (index: number) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
    form.setValue("skills", updatedSkills);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>User Profile</CardTitle>
        <CardDescription>
          Update your personal information and skills
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="john.doe@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    We'll never share your email with anyone else.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date of Birth</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className="w-full pl-3 text-left font-normal"
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="others">Others</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="designation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Designation</FormLabel>
                  <FormControl>
                    <Input placeholder="Software Engineer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="skills"
              render={() => (
                <FormItem>
                  <FormLabel>Skills</FormLabel>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {skills.map((skill, index) => (
                      <div
                        key={index}
                        className="flex items-center bg-slate-100 px-3 py-1 rounded-full"
                      >
                        <span>{skill}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0 ml-1"
                          onClick={() => removeSkill(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder="Add a skill"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addSkill();
                        }
                      }}
                    />
                    <Button type="button" variant="outline" onClick={addSkill}>
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Add
                    </Button>
                  </div>
                  {form.formState.errors.skills && (
                    <p className="text-sm font-medium text-destructive mt-2">
                      {form.formState.errors.skills.message}
                    </p>
                  )}
                </FormItem>
              )}
            />
            <CardFooter className="flex justify-end p-0 pt-4">
              <Button type="submit">Save Profile</Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default Profile;
