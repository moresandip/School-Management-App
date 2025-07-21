"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import {
  Bell,
  BookOpen,
  Calendar,
  GraduationCap,
  Home,
  User,
  Clock,
  Award,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Star,
  Download,
  Plus,
  Trash2,
} from "lucide-react"
import { AddAssignmentModal } from "@/components/add-assignment-modal"
import { AddGradeModal } from "@/components/add-grade-modal"
import { AddScheduleModal } from "@/components/add-schedule-modal"
import { AddContactModal } from "@/components/add-contact-modal"
import { EditProfileModal } from "@/components/edit-profile-modal"
import { Edit, Phone, Mail, MapPin, Droplets, Users } from "lucide-react"
import { NotificationCenter } from "@/components/notification-center"
import { CreateNotificationModal } from "@/components/create-notification-modal"

interface Assignment {
  id: string
  title: string
  subject: string
  dueDate: string
  status: "pending" | "submitted" | "overdue"
  priority: "high" | "medium" | "low"
}

interface Grade {
  subject: string
  grade: string
  percentage: number
  color: string
}

interface Schedule {
  time: string
  subject: string
  teacher: string
  room: string
}

interface Contact {
  id: string
  name: string
  relationship: string
  phone: string
  email: string
  type: "emergency" | "guardian" | "family"
}

interface Notification {
  id: string
  title: string
  message: string
  type: "assignment" | "grade" | "schedule" | "general" | "emergency"
  priority: "high" | "medium" | "low"
  read: boolean
  timestamp: Date
}

export function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [isOnline, setIsOnline] = useState(true)
  const [installPrompt, setInstallPrompt] = useState<any>(null)
  const { toast } = useToast()

  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: "1",
      title: "Math Homework Chapter 5",
      subject: "Mathematics",
      dueDate: "2025-01-25",
      status: "pending",
      priority: "high",
    },
    {
      id: "2",
      title: "Science Lab Report",
      subject: "Physics",
      dueDate: "2025-01-27",
      status: "pending",
      priority: "medium",
    },
    {
      id: "3",
      title: "History Essay",
      subject: "History",
      dueDate: "2025-01-30",
      status: "submitted",
      priority: "low",
    },
    {
      id: "4",
      title: "English Literature Review",
      subject: "English",
      dueDate: "2025-01-23",
      status: "overdue",
      priority: "high",
    },
  ])

  const [grades, setGrades] = useState<Grade[]>([
    { subject: "Mathematics", grade: "A", percentage: 92, color: "bg-green-500" },
    { subject: "Physics", grade: "B+", percentage: 87, color: "bg-blue-500" },
    { subject: "Chemistry", grade: "A-", percentage: 89, color: "bg-purple-500" },
    { subject: "English", grade: "B", percentage: 84, color: "bg-orange-500" },
    { subject: "History", grade: "A", percentage: 94, color: "bg-green-500" },
  ])

  const [schedule, setSchedule] = useState<Schedule[]>([
    { time: "08:00 AM", subject: "Mathematics", teacher: "Dr. Smith", room: "Room 101" },
    { time: "09:30 AM", subject: "Physics", teacher: "Prof. Johnson", room: "Lab 201" },
    { time: "11:00 AM", subject: "English", teacher: "Ms. Davis", room: "Room 105" },
    { time: "01:00 PM", subject: "Chemistry", teacher: "Dr. Wilson", room: "Lab 301" },
    { time: "02:30 PM", subject: "History", teacher: "Mr. Brown", room: "Room 203" },
  ])

  const [contacts, setContacts] = useState([
    {
      id: "1",
      name: "Jane Smith",
      relationship: "Mother",
      phone: "+1 (555) 987-6543",
      email: "jane.smith@email.com",
      type: "guardian" as const,
    },
    {
      id: "2",
      name: "Robert Smith",
      relationship: "Father",
      phone: "+1 (555) 123-9876",
      email: "robert.smith@email.com",
      type: "emergency" as const,
    },
    {
      id: "3",
      name: "Sarah Smith",
      relationship: "Sister",
      phone: "+1 (555) 456-7890",
      email: "sarah.smith@email.com",
      type: "family" as const,
    },
  ])

  const [studentProfile, setStudentProfile] = useState({
    name: "John Smith",
    studentId: "STU2025001",
    grade: "Grade 12",
    stream: "Science Stream",
    email: "john.smith@school.edu",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, City, State 12345",
    dateOfBirth: "2007-05-15",
    bloodGroup: "O+",
  })

  const [showAddAssignment, setShowAddAssignment] = useState(false)
  const [showAddGrade, setShowAddGrade] = useState(false)
  const [showAddSchedule, setShowAddSchedule] = useState(false)
  const [showAddContact, setShowAddContact] = useState(false)
  const [showEditProfile, setShowEditProfile] = useState(false)

  const [notifications, setNotifications] = useState([
    {
      id: "1",
      title: "New Assignment Posted",
      message: "Math Homework Chapter 5 has been assigned. Due date: January 25, 2025",
      type: "assignment" as const,
      priority: "high" as const,
      read: false,
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    },
    {
      id: "2",
      title: "Grade Updated",
      message: "Your Physics test grade has been updated. Check your grades section.",
      type: "grade" as const,
      priority: "medium" as const,
      read: false,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    },
    {
      id: "3",
      title: "Schedule Change",
      message: "Chemistry class has been moved to Lab 302 for tomorrow.",
      type: "schedule" as const,
      priority: "medium" as const,
      read: true,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    },
  ])

  const [showCreateNotification, setShowCreateNotification] = useState(false)

  // Sample data
  // const assignments: Assignment[] = [
  //   {
  //     id: "1",
  //     title: "Math Homework Chapter 5",
  //     subject: "Mathematics",
  //     dueDate: "2025-01-25",
  //     status: "pending",
  //     priority: "high",
  //   },
  //   {
  //     id: "2",
  //     title: "Science Lab Report",
  //     subject: "Physics",
  //     dueDate: "2025-01-27",
  //     status: "pending",
  //     priority: "medium",
  //   },
  //   {
  //     id: "3",
  //     title: "History Essay",
  //     subject: "History",
  //     dueDate: "2025-01-30",
  //     status: "submitted",
  //     priority: "low",
  //   },
  //   {
  //     id: "4",
  //     title: "English Literature Review",
  //     subject: "English",
  //     dueDate: "2025-01-23",
  //     status: "overdue",
  //     priority: "high",
  //   },
  // ]

  // const grades: Grade[] = [
  //   { subject: "Mathematics", grade: "A", percentage: 92, color: "bg-green-500" },
  //   { subject: "Physics", grade: "B+", percentage: 87, color: "bg-blue-500" },
  //   { subject: "Chemistry", grade: "A-", percentage: 89, color: "bg-purple-500" },
  //   { subject: "English", grade: "B", percentage: 84, color: "bg-orange-500" },
  //   { subject: "History", grade: "A", percentage: 94, color: "bg-green-500" },
  // ]

  // const todaySchedule: Schedule[] = [
  //   { time: "08:00 AM", subject: "Mathematics", teacher: "Dr. Smith", room: "Room 101" },
  //   { time: "09:30 AM", subject: "Physics", teacher: "Prof. Johnson", room: "Lab 201" },
  //   { time: "11:00 AM", subject: "English", teacher: "Ms. Davis", room: "Room 105" },
  //   { time: "01:00 PM", subject: "Chemistry", teacher: "Dr. Wilson", room: "Lab 301" },
  //   { time: "02:30 PM", subject: "History", teacher: "Mr. Brown", room: "Room 203" },
  // ]

  useEffect(() => {
    // Check online status
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    // PWA install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setInstallPrompt(e)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

    // Request notification permission
    if ("Notification" in window && "serviceWorker" in navigator) {
      Notification.requestPermission()
    }

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    }
  }, [])

  const sendBrowserNotification = async (title: string, body: string) => {
    if ("Notification" in window && "serviceWorker" in navigator) {
      const permission = await Notification.requestPermission()

      if (permission === "granted") {
        const registration = await navigator.serviceWorker.ready

        if ("showNotification" in registration) {
          registration.showNotification(title, {
            body,
            icon: "/icon-192x192.png",
            badge: "/icon-192x192.png",
            tag: "student-portal-notification",
            requireInteraction: true,
            actions: [
              { action: "view", title: "View Details" },
              { action: "dismiss", title: "Dismiss" },
            ],
          })
        } else {
          new Notification(title, {
            body,
            icon: "/icon-192x192.png",
          })
        }
      }
    }
  }

  const sendNotification = async () => {
    const testNotification = {
      title: "Test Notification",
      message: "This is a demo push notification from your Student Portal app!",
      type: "general" as const,
      priority: "medium" as const,
    }

    createNotification(testNotification)
  }

  const installPWA = async () => {
    if (installPrompt) {
      installPrompt.prompt()
      const { outcome } = await installPrompt.userChoice

      if (outcome === "accepted") {
        toast({
          title: "App Installed!",
          description: "Student Portal has been installed on your device.",
        })
      }

      setInstallPrompt(null)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "submitted":
        return "bg-green-100 text-green-800"
      case "overdue":
        return "bg-red-100 text-red-800"
      default:
        return "bg-yellow-100 text-yellow-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-yellow-500"
      default:
        return "bg-green-500"
    }
  }

  // Assignment CRUD functions
  const addAssignment = (newAssignment: Omit<Assignment, "id">) => {
    const assignment: Assignment = {
      ...newAssignment,
      id: Date.now().toString(),
    }
    setAssignments((prev) => [...prev, assignment])
    setShowAddAssignment(false)
    toast({
      title: "Assignment Added",
      description: `${assignment.title} has been added successfully.`,
    })
  }

  const deleteAssignment = (id: string) => {
    setAssignments((prev) => prev.filter((assignment) => assignment.id !== id))
    toast({
      title: "Assignment Deleted",
      description: "Assignment has been removed successfully.",
    })
  }

  // Grade CRUD functions
  const addGrade = (newGrade: Grade) => {
    setGrades((prev) => [...prev, newGrade])
    setShowAddGrade(false)
    toast({
      title: "Grade Added",
      description: `${newGrade.subject} grade has been added successfully.`,
    })
  }

  const deleteGrade = (subject: string) => {
    setGrades((prev) => prev.filter((grade) => grade.subject !== subject))
    toast({
      title: "Grade Deleted",
      description: "Grade has been removed successfully.",
    })
  }

  // Schedule CRUD functions
  const addScheduleItem = (newScheduleItem: Schedule) => {
    setSchedule((prev) => [...prev, newScheduleItem])
    setShowAddSchedule(false)
    toast({
      title: "Class Added",
      description: `${newScheduleItem.subject} class has been added successfully.`,
    })
  }

  const deleteScheduleItem = (time: string, subject: string) => {
    setSchedule((prev) => prev.filter((item) => !(item.time === time && item.subject === subject)))
    toast({
      title: "Class Deleted",
      description: "Class has been removed successfully.",
    })
  }

  // Contact CRUD functions
  const addContact = (newContact: Omit<Contact, "id">) => {
    const contact = {
      ...newContact,
      id: Date.now().toString(),
    }
    setContacts((prev) => [...prev, contact])
    setShowAddContact(false)
    toast({
      title: "Contact Added",
      description: `${contact.name} has been added successfully.`,
    })
  }

  const deleteContact = (id: string) => {
    setContacts((prev) => prev.filter((contact) => contact.id !== id))
    toast({
      title: "Contact Deleted",
      description: "Contact has been removed successfully.",
    })
  }

  // Profile update function
  const updateProfile = (updatedProfile: typeof studentProfile) => {
    setStudentProfile(updatedProfile)
    setShowEditProfile(false)
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
    })
  }

  // Notification management functions
  const createNotification = (notificationData: {
    title: string
    message: string
    type: "assignment" | "grade" | "schedule" | "general" | "emergency"
    priority: "high" | "medium" | "low"
  }) => {
    const newNotification = {
      id: Date.now().toString(),
      ...notificationData,
      read: false,
      timestamp: new Date(),
    }

    setNotifications((prev) => [newNotification, ...prev])
    setShowCreateNotification(false)

    // Send browser notification
    sendBrowserNotification(newNotification.title, newNotification.message)

    toast({
      title: "Notification Created",
      description: `${newNotification.title} has been sent successfully.`,
    })
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAsUnread = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: false } : notification)),
    )
  }

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
    toast({
      title: "Notification Deleted",
      description: "Notification has been removed successfully.",
    })
  }

  const clearAllNotifications = () => {
    setNotifications([])
    toast({
      title: "All Notifications Cleared",
      description: "All notifications have been removed.",
    })
  }

  const getContactTypeColor = (type: string) => {
    switch (type) {
      case "emergency":
        return "bg-red-100 text-red-800"
      case "guardian":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-green-100 text-green-800"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <GraduationCap className="h-8 w-8 text-blue-600" />
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Student Portal</h1>
              </div>
              {!isOnline && (
                <Badge variant="destructive" className="animate-pulse">
                  Offline
                </Badge>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <Button onClick={sendNotification} variant="outline" size="sm" className="hidden sm:flex bg-transparent">
                <div className="relative">
                  <Bell className="h-4 w-4 mr-2" />
                  {notifications.filter((n) => !n.read).length > 0 && (
                    <Badge className="absolute -top-2 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center text-xs">
                      {notifications.filter((n) => !n.read).length}
                    </Badge>
                  )}
                </div>
                Send Notification
              </Button>

              {installPrompt && (
                <Button onClick={installPWA} variant="outline" size="sm" className="hidden sm:flex bg-transparent">
                  <Download className="h-4 w-4 mr-2" />
                  Install App
                </Button>
              )}

              <Avatar>
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Navigation Tabs */}
          <TabsList className="grid w-full grid-cols-6 lg:w-auto lg:grid-cols-6">
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="grades" className="flex items-center space-x-2">
              <Award className="h-4 w-4" />
              <span className="hidden sm:inline">Grades</span>
            </TabsTrigger>
            <TabsTrigger value="assignments" className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Assignments</span>
            </TabsTrigger>
            <TabsTrigger value="schedule" className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Schedule</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center space-x-2">
              <div className="relative">
                <Bell className="h-4 w-4" />
                {notifications.filter((n) => !n.read).length > 0 && (
                  <div className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full" />
                )}
              </div>
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Overall GPA</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">3.89</div>
                  <p className="text-xs text-muted-foreground">+0.12 from last semester</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
                  <AlertCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">
                    {assignments.filter((a) => a.status === "pending").length}
                  </div>
                  <p className="text-xs text-muted-foreground">2 due this week</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Attendance</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">94%</div>
                  <p className="text-xs text-muted-foreground">Excellent attendance</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Next Class</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600">2:30 PM</div>
                  <p className="text-xs text-muted-foreground">Chemistry - Lab 301</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Assignments</CardTitle>
                  <CardDescription>Your latest homework and projects</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {assignments.slice(0, 3).map((assignment) => (
                    <div
                      key={assignment.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium">{assignment.title}</h4>
                        <p className="text-sm text-muted-foreground">{assignment.subject}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${getPriorityColor(assignment.priority)}`} />
                        <Badge className={getStatusColor(assignment.status)}>{assignment.status}</Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Today's Schedule</CardTitle>
                  <CardDescription>Your classes for today</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {schedule.slice(0, 3).map((class_, index) => (
                    <div key={index} className="flex items-center space-x-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                      <div className="text-sm font-medium text-blue-600 min-w-[70px]">{class_.time}</div>
                      <div className="flex-1">
                        <h4 className="font-medium">{class_.subject}</h4>
                        <p className="text-sm text-muted-foreground">
                          {class_.teacher} • {class_.room}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Grades Tab */}
          <TabsContent value="grades" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Academic Performance</CardTitle>
                  <CardDescription>Your grades across all subjects</CardDescription>
                </div>
                <Button onClick={() => setShowAddGrade(true)} className="bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Grade
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                {grades.map((grade, index) => (
                  <div
                    key={index}
                    className="space-y-2 p-4 rounded-lg border bg-card hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{grade.subject}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold">{grade.grade}</span>
                        <span className="text-sm text-muted-foreground">({grade.percentage}%)</span>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deleteGrade(grade.subject)}
                          className="ml-2"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <Progress value={grade.percentage} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Assignments Tab */}
          <TabsContent value="assignments" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>All Assignments</CardTitle>
                  <CardDescription>Manage your homework and projects</CardDescription>
                </div>
                <Button onClick={() => setShowAddAssignment(true)} className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Assignment
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {assignments.map((assignment) => (
                  <div key={assignment.id} className="p-4 rounded-lg border bg-card hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <h3 className="font-semibold">{assignment.title}</h3>
                        <p className="text-sm text-muted-foreground">{assignment.subject}</p>
                        <p className="text-sm">Due: {new Date(assignment.dueDate).toLocaleDateString()}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${getPriorityColor(assignment.priority)}`} />
                        <Badge className={getStatusColor(assignment.status)}>{assignment.status}</Badge>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deleteAssignment(assignment.id)}
                          className="ml-2"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Schedule Tab */}
          <TabsContent value="schedule" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Class Schedule</CardTitle>
                  <CardDescription>Your daily class timetable</CardDescription>
                </div>
                <Button onClick={() => setShowAddSchedule(true)} className="bg-purple-600 hover:bg-purple-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Class
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {schedule.map((class_, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 p-4 rounded-lg border bg-card hover:shadow-md transition-shadow"
                  >
                    <div className="text-lg font-semibold text-blue-600 min-w-[100px]">{class_.time}</div>
                    <div className="flex-1 space-y-1">
                      <h3 className="font-semibold">{class_.subject}</h3>
                      <p className="text-sm text-muted-foreground">{class_.teacher}</p>
                      <p className="text-sm text-muted-foreground">{class_.room}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="h-5 w-5 text-yellow-500" />
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteScheduleItem(class_.time, class_.subject)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Notification Center</h2>
                <p className="text-muted-foreground">Manage your notifications and alerts</p>
              </div>
              <div className="flex space-x-2">
                <Button onClick={() => setShowCreateNotification(true)} className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Notification
                </Button>
                <Button onClick={sendNotification} variant="outline">
                  <Bell className="h-4 w-4 mr-2" />
                  Send Test Notification
                </Button>
              </div>
            </div>

            <NotificationCenter
              notifications={notifications}
              onMarkAsRead={markAsRead}
              onMarkAsUnread={markAsUnread}
              onDelete={deleteNotification}
              onClearAll={clearAllNotifications}
            />
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Student Profile</CardTitle>
                  <CardDescription>Your personal information and academic details</CardDescription>
                </div>
                <Button onClick={() => setShowEditProfile(true)} className="bg-blue-600 hover:bg-blue-700">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="/placeholder.svg?height=80&width=80" />
                    <AvatarFallback className="text-lg">
                      {studentProfile.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <h2 className="text-2xl font-bold">{studentProfile.name}</h2>
                    <p className="text-muted-foreground">Student ID: {studentProfile.studentId}</p>
                    <p className="text-muted-foreground">
                      {studentProfile.grade} - {studentProfile.stream}
                    </p>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center">
                      <User className="h-5 w-5 mr-2" />
                      Personal Information
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Email</p>
                          <p className="text-sm text-muted-foreground">{studentProfile.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Phone</p>
                          <p className="text-sm text-muted-foreground">{studentProfile.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Address</p>
                          <p className="text-sm text-muted-foreground">{studentProfile.address}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Date of Birth</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(studentProfile.dateOfBirth).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Droplets className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Blood Group</p>
                          <p className="text-sm text-muted-foreground">{studentProfile.bloodGroup}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold flex items-center">
                        <Users className="h-5 w-5 mr-2" />
                        Emergency Contacts
                      </h3>
                      <Button
                        onClick={() => setShowAddContact(true)}
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Contact
                      </Button>
                    </div>
                    <div className="space-y-3">
                      {contacts.map((contact) => (
                        <div
                          key={contact.id}
                          className="p-3 rounded-lg border bg-card hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <div className="flex items-center space-x-2">
                                <h4 className="font-medium">{contact.name}</h4>
                                <Badge className={getContactTypeColor(contact.type)}>{contact.type}</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{contact.relationship}</p>
                              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                <span className="flex items-center">
                                  <Phone className="h-3 w-3 mr-1" />
                                  {contact.phone}
                                </span>
                                {contact.email && (
                                  <span className="flex items-center">
                                    <Mail className="h-3 w-3 mr-1" />
                                    {contact.email}
                                  </span>
                                )}
                              </div>
                            </div>
                            <Button variant="destructive" size="sm" onClick={() => deleteContact(contact.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4 pt-4 border-t">
                  <Button onClick={sendNotification}>
                    <Bell className="h-4 w-4 mr-2" />
                    Send Test Notification
                  </Button>
                  {installPrompt && (
                    <Button onClick={installPWA} variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Install App
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Mobile Navigation */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t">
        <div className="flex justify-center py-2">
          <Button onClick={sendNotification} className="mx-2" size="sm">
            <Bell className="h-4 w-4 mr-2" />
            Send Notification
          </Button>
        </div>
      </div>

      {/* Add Modals */}
      <AddAssignmentModal open={showAddAssignment} onOpenChange={setShowAddAssignment} onAdd={addAssignment} />
      <AddGradeModal open={showAddGrade} onOpenChange={setShowAddGrade} onAdd={addGrade} />
      <AddScheduleModal open={showAddSchedule} onOpenChange={setShowAddSchedule} onAdd={addScheduleItem} />
      <AddContactModal open={showAddContact} onOpenChange={setShowAddContact} onAdd={addContact} />
      <EditProfileModal
        open={showEditProfile}
        onOpenChange={setShowEditProfile}
        profile={studentProfile}
        onUpdate={updateProfile}
      />
      <CreateNotificationModal
        open={showCreateNotification}
        onOpenChange={setShowCreateNotification}
        onCreateNotification={createNotification}
      />
    </div>
  )
}
