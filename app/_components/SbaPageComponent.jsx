"use client";
import React, { useState, useEffect, useRef, memo } from "react";
import {
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaComment,
  FaUser,
} from "react-icons/fa";
import { FaHeart, FaRegComment, FaShare } from "react-icons/fa";

import { IoMdSend } from "react-icons/io";
import { LuLoaderCircle } from "react-icons/lu";
import { FaWhatsapp } from "react-icons/fa";
import Header from "@/app/layouts/Header1";
import Footer from "@/app/layouts/Footer";
import { photoData1 } from "@/app/data/sba";
import { useRouter } from "next/navigation";
import axios from "axios";

const preloadImage = (src) => {
  const img = new Image();
  img.src = src;
};

const PhotoCard = memo(
  ({
    photo,
    index,
    hasAnimated,
    onOpenModal,
    onOpenCommentModal,
    getCommentsCount,
  }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);
    const imgRef = useRef(null);

    // Check if image is already loaded (for cached images)
    useEffect(() => {
      const img = imgRef.current;
      if (img && img.complete && img.naturalHeight !== 0) {
        setImageLoaded(true);
      }
    }, []);

    const handleImageLoad = () => {
      setImageLoaded(true);
    };

    const handleImageError = () => {
      console.error(`Failed to load image: ${photo.imageUrl}`);
      setImageError(true);
    };

    return (
      <div
        className={`bg-white rounded-sm shadow-sm hover:shadow-xl transition-all duration-300 transform hover:scale-100 hover:-translate-y-1 cursor-pointer overflow-hidden ${
          hasAnimated ? "opacity-100" : "opacity-0"
        }`}
        style={{
          animation: hasAnimated
            ? "none"
            : `fadeIn 0.6s ease-out ${index * 100}ms forwards`,
        }}
        onClick={() => onOpenModal(index)}
      >
        <div className="relative overflow-hidden bg-gray-200 group">
          {!imageError ? (
            <>
              {!imageLoaded && (
                <div
                  className="w-full bg-gray-300 animate-pulse flex items-center justify-center"
                  style={{ aspectRatio: "240/297" }}
                >
                  <img className="w-12" src="/hero1.png" alt="" />
                </div>
              )}
              <img
                ref={imgRef}
                src={photo.imageUrl}
                alt={photo.name}
                className={`w-full object-cover transition-all duration-500 group-hover:scale-100 ${
                  imageLoaded ? "opacity-100" : "opacity-0 absolute"
                }`}
                style={{ aspectRatio: "240/297" }}
                onLoad={handleImageLoad}
                onError={handleImageError}
                loading="lazy"
              />
            </>
          ) : (
            <div
              className="w-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center"
              style={{ aspectRatio: "240/297" }}
            >
              <div className="text-center text-gray-600">
                <div className="text-2xl mb-2">📷</div>
                <div className="text-sm">Image not available</div>
              </div>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          <div className="absolute top-0 left-0 right-0 p-2 py-4 sm:p-6 bg-gradient-to-b from-black/80 via-black/60 to-transparent transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="text-base sm:text-xl font-bold text-white mb-2 drop-shadow-lg">
              {photo.name}
            </h3>
          </div>

          {/* Comment button at bottom */}
          {/* <div className="absolute bottom-2 right-2 transition-opacity duration-300">
      <button
        onClick={(e) => onOpenCommentModal(index, e)}
        className="bg-white/90 hover:bg-white text-golden/90 hover:text-golden/100 p-2 rounded-full shadow-lg transition-all duration-200 flex items-center gap-1"
      >
        <FaComment className="w-4 h-4" />
        {getCommentsCount(index) > 0 && (
          <span className="text-xs font-medium">
            {getCommentsCount(index)}
          </span>
        )}
      </button>
    </div> */}
        </div>
      </div>
    );
  }
);

PhotoCard.displayName = "PhotoCard";

const PhotoGallery = () => {
  const router = useRouter();
  const [language, setLanguage] = useState("hindi");
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Comment system state
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [selectedPhotoForComment, setSelectedPhotoForComment] = useState(null);
  const [commentUsername, setCommentUsername] = useState("");
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState({});
  const [commentsLoading, setCommentsLoading] = useState(false);

  const [commentModalHeight, setCommentModalHeight] = useState("70vh");
  const [isCommentModalAnimating, setIsCommentModalAnimating] = useState(false);
  const commentModalRef = useRef(null);

  // Touch/swipe state
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const modalRef = useRef(null);

  const sortedPhotos = photoData1[language].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  // WhatsApp group links for different languages
  const whatsappLinks = {
    hindi: "https://chat.whatsapp.com/FnaRgKLT21RBR6bqZeV3ri",
    gujarati: "https://chat.whatsapp.com/FBmimooR4HML8NF131x7Cd",
  };

  // Function to fetch and organize all comments by photo name
  const fetchAllComments = async () => {
    setCommentsLoading(true);
    try {
      const response = await axios.get(
        "https://us-central1-adhyatm-parivar-main.cloudfunctions.net/getAllComments"
      );

      if (response.status === 200 && response.data.allRecords) {
        const commentsData = response.data.allRecords;

        // Group comments by unified photo key (uid)
        const commentsByPhotoKey = {};

        commentsData.forEach((comment) => {
          // Use uid as the unified key
          const photoKey = comment.uid;
          if (!commentsByPhotoKey[photoKey]) {
            commentsByPhotoKey[photoKey] = [];
          }
          commentsByPhotoKey[photoKey].push(comment);
        });

        setComments(commentsByPhotoKey);
        return commentsByPhotoKey;
      } else {
        console.log("Unexpected response format:", response.data);
        return {};
      }
    } catch (error) {
      console.log("Error fetching comments:", error);
      return {};
    } finally {
      setCommentsLoading(false);
    }
  };

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => setHasAnimated(true), 1000);
    // Fetch comments when component mounts
    fetchAllComments();
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setHasAnimated(false);
    const timer = setTimeout(() => setHasAnimated(true), 600);
    return () => clearTimeout(timer);
  }, [language]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isModalOpen && !isCommentModalOpen) return;

      switch (e.key) {
        case "Escape":
          if (isCommentModalOpen) {
            closeCommentModal();
          } else {
            closeModal();
          }
          break;
        case "ArrowLeft":
          if (isModalOpen) {
            e.preventDefault();
            goToPrevious();
          }
          break;
        case "ArrowRight":
          if (isModalOpen) {
            e.preventDefault();
            goToNext();
          }
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, isCommentModalOpen]);

  // Cleanup effect for body overflow
  useEffect(() => {
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // Route change cleanup effect
  useEffect(() => {
    const handleRouteChange = () => {
      document.body.style.overflow = "unset";
    };
    router.events?.on("routeChangeStart", handleRouteChange);
    return () => {
      router.events?.off("routeChangeStart", handleRouteChange);
    };
  }, [router]);

  // Image preloading effect
  useEffect(() => {
    if (isModalOpen && selectedImageIndex !== null) {
      // console.log(sortedPhotos.length,"sortedPhotos.length")
      const nextIndex = (selectedImageIndex + 1) % sortedPhotos.length;
      const prevIndex =
        (selectedImageIndex - 1 + sortedPhotos.length) % sortedPhotos.length;
      // console.log(prevIndex,nextIndex," prev next")
      preloadImage(sortedPhotos[nextIndex].imageUrl);
      preloadImage(sortedPhotos[prevIndex].imageUrl);
    }
  }, [selectedImageIndex, isModalOpen, sortedPhotos]);

  // Swipe detection constants
  const minSwipeDistance = 50;

  // Touch handlers for swipe functionality
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }

    // Reset touch values immediately after handling
    setTouchStart(null);
    setTouchEnd(null);
  };

  const toggleLanguage = (lang) => {
    setLanguage(lang);
  };

  // Memoized callback to prevent re-renders
  const openModal = React.useCallback((index) => {
    // console.log(index,"index")
    setSelectedImageIndex(index);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImageIndex(null);
    document.body.style.overflow = "unset";
    setTouchStart(null);
    setTouchEnd(null);
  };

  const goToPrevious = () => {
    setSelectedImageIndex((prev) =>
      prev === 0 ? sortedPhotos.length - 1 : prev - 1
    );
    // Clear touch values to prevent interaction conflicts
    setTouchStart(null);
    setTouchEnd(null);
  };

  const goToNext = () => {
    setSelectedImageIndex((prev) =>
      prev === sortedPhotos.length - 1 ? 0 : prev + 1
    );
    // Clear touch values to prevent interaction conflicts
    setTouchStart(null);
    setTouchEnd(null);
  };

  // Comment system functions
  const closeCommentModal = () => {
    setIsCommentModalAnimating(false);
    setTimeout(() => {
      setIsCommentModalOpen(false);
      setSelectedPhotoForComment(null);
      setCommentUsername("");
      setCommentText("");
      document.body.style.overflow = "unset";
    }, 300);
  };

  // Update the openCommentModal function:
  const openCommentModal = React.useCallback((photoIndex, e) => {
    e.stopPropagation();
    setSelectedPhotoForComment(photoIndex);
    setIsCommentModalOpen(true);
    document.body.style.overflow = "hidden";
    // Add animation delay
    setTimeout(() => {
      setIsCommentModalAnimating(true);
    }, 10);
  }, []);

  // Update the submitComment function to reset modal animation:
  const submitComment = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!commentUsername.trim() || !commentText.trim()) {
      setLoading(false);
      return;
    }

    // Use selectedPhotoForComment if available (mobile), otherwise use selectedImageIndex (desktop)
    const photoIndex =
      selectedPhotoForComment !== null
        ? selectedPhotoForComment
        : selectedImageIndex;
    const photoUid = sortedPhotos[photoIndex].uid;
    const photoName = sortedPhotos[photoIndex].name;

    const newComment = {
      id: Date.now(),
      username: commentUsername.trim(),
      comment: commentText.trim(),
      timestamp: new Date().toISOString(),
      photoName: photoName,
      uid: photoUid,
      isApproved: false,
    };

    try {
      const response = await axios.post(
        "https://submitcomment-fahifz22ha-uc.a.run.app",
        newComment
      );

      if (response.status === 200) {
        console.log("Comment submitted successfully:", response.data);
        await fetchAllComments();
        setLoading(false);

        // Show success message
        setShowSuccessMessage(true);

        // Hide success message after 3 seconds
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 3000);

        // Only clear comment text, keep username
        setCommentText("");
      } else {
        console.log("Unexpected response status:", response.status);
        setLoading(false);
      }
    } catch (error) {
      console.log("Error submitting comment:", error);
      setLoading(false);
    }
  };
  // 4. Update the getCommentsCount function to use uid as unified key
  const getCommentsCount = React.useCallback(
    (photoIndex) => {
      const photoUid = sortedPhotos[photoIndex].uid;
      return comments[photoUid]?.length || 0;
    },
    [comments, sortedPhotos]
  );

  function timeAgo(dateString) {
    const now = new Date();
    const past = new Date(dateString);
    const diff = Math.floor((now - past) / 1000);

    if (diff < 60) return "just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
    if (diff < 2419200) return `${Math.floor(diff / 604800)}w ago`;

    return past.toLocaleDateString();
  }

  return (
    <div
      className={`min-h-screen max-w-7xl bg-gray-50 transition-opacity duration-1000 ${
        language === "hindi" ? "font-Teko" : "font-Anek"
      } ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      {/* Header */}
      <Header />
      <header className="bg-transparent backdrop-blur-lg px-4 sticky top-0 z-50 shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-2 py-2 sm:px-4 lg:px-8">
          <div className="flex justify-between flex-col gap-2 sm:flex-row items-center py-2">
            <div
              className={`${
                language === "hindi" ? "font-Teko" : "font-notoGujarati"
              }`}
            >
              <h1 className="text-2xl sm:text-2xl font-bold text-gray-900">
                {language === "hindi"
                  ? "शासनभक्ति की अंजलि"
                  : "શાસનભક્તિની અંજલિ"}
              </h1>
              <p className="font-karma text-sm sm:text-base font-bold text-gray-600">
                {language === "hindi"
                  ? "अध्यात्म परिवार द्वारा किए जा रहे शासन सेवा - सुरक्षा के कार्यों की झलक"
                  : "અધ્યાત્મ પરિવાર દ્વારા કરવામાં આવી રહેલા શાસન - સુરક્ષાના કાર્યોની એક ઝલક"}
              </p>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              {/* WhatsApp Group Link */}
              <a
                href={whatsappLinks[language]}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
              >
                <FaWhatsapp className="w-4 h-4" />
                <span className="text-xs font-medium">
                  {language === "hindi"
                    ? "जॉइन व्हाट्सऐप ग्रुप"
                    : "જોઇન વોટ્સએપ ગ્રુપ"}
                </span>
              </a>

              {/* Language Toggle */}
              <div className="relative flex items-center bg-gray-300 rounded-3xl p-1 shadow-inner">
                <button
                  onClick={() => toggleLanguage("hindi")}
                  className={`relative px-4 py-2 rounded-3xl text-sm font-medium font-Teko transition-all duration-300 ease-in-out transform ${
                    language === "hindi"
                      ? "bg-black text-white shadow-lg scale-105"
                      : "text-gray-600"
                  }`}
                >
                  हिन्दी
                </button>
                <button
                  onClick={() => toggleLanguage("gujarati")}
                  className={`relative px-4 py-2 rounded-3xl font-notoGujarati text-sm font-medium transition-all duration-300 ease-in-out transform ${
                    language === "gujarati"
                      ? "bg-black text-white shadow-lg scale-105"
                      : "text-gray-600"
                  }`}
                >
                  ગુજરાતી
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Photo Grid */}
      <main className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-4 py-2 sm:py-4">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:gap-4 gap-2">
          {sortedPhotos.map((photo, index) => (
            <PhotoCard
              key={photo.imageUrl}
              photo={photo}
              index={index}
              hasAnimated={hasAnimated}
              onOpenModal={openModal}
              onOpenCommentModal={openCommentModal}
              getCommentsCount={getCommentsCount}
            />
          ))}
        </div>

        {/* Empty State */}
        {sortedPhotos.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg">
              {language === "hindi"
                ? "कोई फोटो उपलब्ध नहीं है"
                : "કોઈ ફોટો ઉપલબ્ધ નથી"}
            </div>
          </div>
        )}
      </main>

      {/* Modal Gallery */}
      {isModalOpen && selectedImageIndex !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          {/* Desktop Layout */}
          <div className="hidden md:flex bg-white rounded-lg overflow-hidden max-w-[70vw] max-h-[95vh] w-full shadow-2xl">
            {/* Left Side - Image */}
            <div
              className="flex-1 bg-black/90 flex items-center justify-center relative"
              ref={modalRef}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Navigation Buttons */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevious();
                }}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 bg-black/50 p-2 rounded-full transition-colors duration-200 z-10"
              >
                <FaChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 bg-black/50 p-2 rounded-full transition-colors duration-200 z-10"
              >
                <FaChevronRight className="w-6 h-6" />
              </button>

              <img
                src={sortedPhotos[selectedImageIndex].imageUrl}
                alt={sortedPhotos[selectedImageIndex].name}
                className="max-w-full max-h-full object-contain"
                draggable={false}
              />
            </div>

            {/* Right Side - Comments Section */}
            <div
              className="w-96 flex flex-col bg-white"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                    <FaRegComment className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm">
                    {sortedPhotos[selectedImageIndex].name}
                  </h3>
                </div>
                <button
                  onClick={closeModal}
                  className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <FaTimes className="w-5 h-5" />
                </button>
              </div>

              {/* Comments List */}
              <div className="flex-1 overflow-y-auto p-4 min-h-0">
                {commentsLoading ? (
                  <div className="flex flex-col items-center justify-center h-40">
                    <LuLoaderCircle className="w-6 h-6 animate-spin text-golden mb-2" />
                    <p className="text-sm text-gray-500">
                      {language === "hindi"
                        ? "टिप्पणियां लोड हो रही हैं..."
                        : "ટિપ્પણીઓ લોડ થઈ રહી છે..."}
                    </p>
                  </div>
                ) : comments[sortedPhotos[selectedImageIndex].uid]?.length >
                  0 ? (
                  <div className="space-y-4">
                    {comments[sortedPhotos[selectedImageIndex].uid].map(
                      (comment, index) => (
                        <div
                          key={comment.id}
                          className="flex items-start gap-3"
                        >
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <FaUser className="w-3 h-3 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-sm text-gray-900">
                                {comment.username}
                              </span>
                              <span className="text-xs text-gray-500">
                                {timeAgo(comment.timestamp)}
                              </span>
                            </div>
                            <p className="text-sm text-gray-800 break-words">
                              {comment.comment}
                            </p>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-40">
                    <FaComment className="w-8 h-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600 text-center">
                      {language === "hindi"
                        ? "अभी तक कोई टिप्पणी नहीं"
                        : "અત્યાર સુધી કોઈ ટિપ્પણી નથી"}
                    </p>
                  </div>
                )}
              </div>

              {/* success message */}
              {showSuccessMessage && (
                <div className="mx-4 mb-3 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm animate-fade-in">
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>
                      {language === "hindi"
                        ? "टिप्पणी सफलतापूर्वक जमा की गई!"
                        : "ટિપ્પણી સફળતાપૂર્વક સબમિટ કરવામાં આવી!"}
                    </span>
                  </div>
                </div>
              )}

              {/* Comment Input */}
              <div className="border-t border-gray-200 p-4">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSelectedPhotoForComment(selectedImageIndex);
                    submitComment(e);
                  }}
                  className="space-y-3"
                >
                  <input
                    type="text"
                    value={commentUsername}
                    onChange={(e) => setCommentUsername(e.target.value)}
                    placeholder={
                      language === "hindi" ? "आपका नाम..." : "તમારુ નામ..."
                    }
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-golden focus:border-transparent"
                    required
                  />
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder={
                        language === "hindi"
                          ? "टिप्पणी जोड़ें..."
                          : "ટિપ્પણી ઉમેરો..."
                      }
                      className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-golden focus:border-transparent"
                      required
                    />
                    <button
                      type="submit"
                      disabled={
                        !commentUsername.trim() ||
                        !commentText.trim() ||
                        loading
                      }
                      className="px-3 py-3 bg-golden hover:bg-golden/90 disabled:bg-gray-300 text-white text-sm rounded-full transition-colors"
                    >
                      {loading ? (
                        <LuLoaderCircle className="w-4 h-4 animate-spin" />
                      ) : (
                        <IoMdSend />
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Mobile Layout - Original */}
          <div
            className="md:hidden relative max-w-4xl max-h-full"
            ref={modalRef}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-2 p-2 bg-slate-800/50 rounded-full right-6 text-white hover:text-gray-300 transition-colors duration-200 z-10"
            >
              <FaTimes />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              className="absolute bg-slate-800/50 p-3 rounded-full sm:-left-12 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors duration-200 z-10"
              style={{ fontSize: "24px" }}
            >
              <FaChevronLeft />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute bg-slate-800/50 p-3 rounded-full right-0 sm:-right-12 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors duration-200 z-10"
              style={{ fontSize: "24px" }}
            >
              <FaChevronRight />
            </button>

            {/* Image Container */}
            <div
              onClick={(e) => e.stopPropagation()}
              style={{ aspectRatio: "180/270" }}
              className="flex flex-col items-center justify-between w-full"
            >
              {/* Image */}
              <div
                className="bg-transparent rounded-sm shadow-2xl overflow-hidden select-none"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={sortedPhotos[selectedImageIndex].imageUrl}
                  alt={sortedPhotos[selectedImageIndex].name}
                  className="w-full h-auto max-h-[95vh] object-contain"
                  style={{ aspectRatio: "180/270" }}
                  draggable={false}
                />
              </div>

              {/* Action Buttons */}
              <div className="w-[80vw] max-w-2xl px-4 py-3 bg-white shadow-inner rounded-b-lg">
                <div className="flex items-center gap-2 text-gray-700 text-xl">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setTimeout(() => {
                        openCommentModal(selectedImageIndex, e);
                      }, 100);
                    }}
                    className=""
                  >
                    <FaRegComment className="w-6 h-6" />
                  </button>
                  {getCommentsCount(selectedImageIndex) > 0 ? (
                    <span className="font-medium -mb-1 rounded-full ">
                      {getCommentsCount(selectedImageIndex)}
                    </span>
                  ) : (
                    <span className="font-medium -mb-1 rounded-full">0</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isCommentModalOpen && selectedPhotoForComment !== null && (
        <>
          <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-end">
            <div
              className={`w-full bg-white rounded-t-3xl h-[70vh] flex flex-col transition-all duration-300 ${
                isCommentModalAnimating
                  ? "animate-[slideUpMobile_0.3s_ease-out_forwards]"
                  : "animate-[slideDownMobile_0.3s_ease-out_forwards]"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white rounded-t-3xl">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                    <FaRegComment className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-base">
                    {sortedPhotos[selectedPhotoForComment].name}
                  </h3>
                </div>
                <button
                  onClick={closeCommentModal}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <FaTimes className="w-5 h-5" />
                </button>
              </div>

              {/* Handle bar */}
              <div className="flex justify-center py-2">
                <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
              </div>

              {/* Comments List */}
              <div className="flex-1 overflow-y-auto px-4 pb-4 min-h-0 max-h-full">
                {commentsLoading ? (
                  <div className="flex flex-col items-center justify-center h-32">
                    <LuLoaderCircle className="w-6 h-6 animate-spin text-golden mb-2" />
                    <p className="text-sm text-gray-500">
                      {language === "hindi"
                        ? "टिप्पणियां लोड हो रही हैं..."
                        : "ટિપ્પણીઓ લોડ થઈ રહી છે..."}
                    </p>
                  </div>
                ) : comments[sortedPhotos[selectedPhotoForComment].uid]
                    ?.length > 0 ? (
                  <div className="space-y-4 pt-2">
                    {comments[sortedPhotos[selectedPhotoForComment].uid].map(
                      (comment, index) => (
                        <div
                          key={comment.id}
                          className="flex items-start gap-3"
                        >
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <FaUser className="w-3 h-3 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-sm text-gray-900">
                                {comment.username}
                              </span>
                              <span className="text-xs text-gray-500">
                                {timeAgo(comment.timestamp)}
                              </span>
                            </div>
                            <p className="text-sm text-gray-800 break-words">
                              {comment.comment}
                            </p>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-32">
                    <FaComment className="w-8 h-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600 text-center">
                      {language === "hindi"
                        ? "अभी तक कोई टिप्पणी नहीं"
                        : "અત્યાર સુધી કોઈ ટિપ્પણી નથી"}
                    </p>
                  </div>
                )}
              </div>

              {/* comment input */}
              {showSuccessMessage && (
                <div className="mx-4 mb-3 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm animate-fade-in">
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>
                      {language === "hindi"
                        ? "टिप्पणी सफलतापूर्वक जमा की गई!"
                        : "ટિપ્પણી સફળતાપૂર્વક સબમિટ કરવામાં આવી!"}
                    </span>
                  </div>
                </div>
              )}
              {/* Comment Input - Sticky at bottom */}
              <div className="border-t border-gray-200 p-4 bg-white flex-shrink-0">
                <form onSubmit={submitComment} className="space-y-3">
                  <input
                    type="text"
                    value={commentUsername}
                    onChange={(e) => setCommentUsername(e.target.value)}
                    placeholder={
                      language === "hindi" ? "आपका नाम..." : "તમારુ નામ..."
                    }
                    className="w-full px-4 py-3 text-sm border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-golden focus:border-transparent"
                    required
                  />
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder={
                        language === "hindi"
                          ? "टिप्पणी जोड़ें..."
                          : "ટિપ્પણી ઉમેરો..."
                      }
                      className="flex-1 px-4 py-3 text-sm border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-golden focus:border-transparent"
                      required
                    />
                    <button
                      type="submit"
                      disabled={
                        !commentUsername.trim() ||
                        !commentText.trim() ||
                        loading
                      }
                      className="px-3 py-3 bg-golden/90 hover:bg-golden disabled:bg-gray-300 text-white text-sm rounded-full transition-colors flex items-center gap-2"
                    >
                      {loading ? (
                        <LuLoaderCircle className="w-4 h-4 animate-spin" />
                      ) : (
                        <IoMdSend />
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}

      <Footer />
    </div>
  );
};

export default PhotoGallery;

// "use client";
// import React, { useState, useEffect, useRef, memo } from "react";
// import {
//   FaTimes,
//   FaChevronLeft,
//   FaChevronRight,
//   FaComment,
//   FaUser,
// } from "react-icons/fa";
// import { LuLoaderCircle } from "react-icons/lu";
// import { FaWhatsapp } from "react-icons/fa";
// import Header from "@/app/layouts/Header1";
// import Footer from "@/app/layouts/Footer";
// import { photoData1 } from "@/app/data/sba";
// import { useRouter } from "next/navigation";
// import axios from "axios";

// const preloadImage = (src) => {
//   const img = new Image();
//   img.src = src;
// };

// const PhotoCard = memo(
//   ({
//     photo,
//     index,
//     hasAnimated,
//     onOpenModal,
//     onOpenCommentModal,
//     getCommentsCount,
//   }) => {
//     const [imageLoaded, setImageLoaded] = useState(false);
//     const [imageError, setImageError] = useState(false);
//     const imgRef = useRef(null);

//     // Check if image is already loaded (for cached images)
//     useEffect(() => {
//       const img = imgRef.current;
//       if (img && img.complete && img.naturalHeight !== 0) {
//         setImageLoaded(true);
//       }
//     }, []);

//     const handleImageLoad = () => {
//       setImageLoaded(true);
//     };

//     const handleImageError = () => {
//       console.error(`Failed to load image: ${photo.imageUrl}`);
//       setImageError(true);
//     };

//     return (
//      <div
//   className={`bg-white rounded-sm shadow-sm hover:shadow-xl transition-all duration-300 transform hover:scale-100 hover:-translate-y-1 cursor-pointer overflow-hidden ${
//     hasAnimated ? "opacity-100" : "opacity-0"
//   }`}
//   style={{
//     animation: hasAnimated
//       ? "none"
//       : `fadeIn 0.6s ease-out ${index * 100}ms forwards`,
//   }}
//   onClick={() => onOpenModal(index)}
// >
//   <div className="relative overflow-hidden bg-gray-200 group">
//     {!imageError ? (
//       <>
//         {!imageLoaded && (
//           <div
//             className="w-full bg-gray-300 animate-pulse flex items-center justify-center"
//             style={{ aspectRatio: "240/297" }}
//           >
//             <img className="w-12" src="/hero1.png" alt="" />
//           </div>
//         )}
//         <img
//           ref={imgRef}
//           src={photo.imageUrl}
//           alt={photo.name}
//           className={`w-full object-cover transition-all duration-500 group-hover:scale-100 ${
//             imageLoaded ? "opacity-100" : "opacity-0 absolute"
//           }`}
//           style={{ aspectRatio: "240/297" }}
//           onLoad={handleImageLoad}
//           onError={handleImageError}
//           loading="lazy"
//         />
//       </>
//     ) : (
//       <div
//         className="w-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center"
//         style={{ aspectRatio: "240/297" }}
//       >
//         <div className="text-center text-gray-600">
//           <div className="text-2xl mb-2">📷</div>
//           <div className="text-sm">Image not available</div>
//         </div>
//       </div>
//     )}

//     <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

//     <div className="absolute top-0 left-0 right-0 p-2 py-4 sm:p-6 bg-gradient-to-b from-black/80 via-black/60 to-transparent transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
//       <h3 className="text-base sm:text-xl font-bold text-white mb-2 drop-shadow-lg">
//         {photo.name}
//       </h3>
//     </div>

//     {/* Comment button at bottom */}
//     <div className="absolute bottom-2 right-2 transition-opacity duration-300">
//       <button
//         onClick={(e) => onOpenCommentModal(index, e)}
//         className="bg-white/90 hover:bg-white text-golden/90 hover:text-golden/100 p-2 rounded-full shadow-lg transition-all duration-200 flex items-center gap-1"
//       >
//         <FaComment className="w-4 h-4" />
//         {getCommentsCount(index) > 0 && (
//           <span className="text-xs font-medium">
//             {getCommentsCount(index)}
//           </span>
//         )}
//       </button>
//     </div>
//   </div>
// </div>
//     );
//   }
// );

// PhotoCard.displayName = "PhotoCard";

// const PhotoGallery = () => {
//   const router = useRouter();
//   const [language, setLanguage] = useState("hindi");
//   const [isVisible, setIsVisible] = useState(false);
//   const [selectedImageIndex, setSelectedImageIndex] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [hasAnimated, setHasAnimated] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // Comment system state
//   const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
//   const [selectedPhotoForComment, setSelectedPhotoForComment] = useState(null);
//   const [commentUsername, setCommentUsername] = useState("");
//   const [commentText, setCommentText] = useState("");
//   const [comments, setComments] = useState({});
//   const [commentsLoading, setCommentsLoading] = useState(false);

// const [commentModalHeight, setCommentModalHeight] = useState('70vh');
// const [isCommentModalAnimating, setIsCommentModalAnimating] = useState(false);
// const commentModalRef = useRef(null);

//   // Touch/swipe state
//   const [touchStart, setTouchStart] = useState(null);
//   const [touchEnd, setTouchEnd] = useState(null);
//   const modalRef = useRef(null);

//   const sortedPhotos = photoData1[language].sort(
//     (a, b) => new Date(a.date) - new Date(b.date)
//   );

//   // WhatsApp group links for different languages
//   const whatsappLinks = {
//     hindi: "https://chat.whatsapp.com/IynFtADovgx5gZEIjtxLc2",
//     gujarati: "https://chat.whatsapp.com/EukBJFoWlH30N9tfyvsDsH",
//   };

//   // Function to fetch and organize all comments by photo name
//   const fetchAllComments = async () => {
//   setCommentsLoading(true);
//   try {
//     const response = await axios.get(
//       "https://us-central1-adhyatm-parivar-main.cloudfunctions.net/getAllComments"
//     );

//     if (response.status === 200 && response.data.allRecords) {
//       const commentsData = response.data.allRecords;

//       // Group comments by unified photo key (uid)
//       const commentsByPhotoKey = {};

//       commentsData.forEach((comment) => {
//         // Use uid as the unified key
//         const photoKey = comment.uid;
//         if (!commentsByPhotoKey[photoKey]) {
//           commentsByPhotoKey[photoKey] = [];
//         }
//         commentsByPhotoKey[photoKey].push(comment);
//       });

//       setComments(commentsByPhotoKey);
//       return commentsByPhotoKey;
//     } else {
//       console.log("Unexpected response format:", response.data);
//       return {};
//     }
//   } catch (error) {
//     console.log("Error fetching comments:", error);
//     return {};
//   } finally {
//     setCommentsLoading(false);
//   }
// };

//   useEffect(() => {
//     setIsVisible(true);
//     const timer = setTimeout(() => setHasAnimated(true), 1000);
//     // Fetch comments when component mounts
//     fetchAllComments();
//     return () => clearTimeout(timer);
//   }, []);

//   useEffect(() => {
//     setHasAnimated(false);
//     const timer = setTimeout(() => setHasAnimated(true), 600);
//     return () => clearTimeout(timer);
//   }, [language]);

//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (!isModalOpen && !isCommentModalOpen) return;

//       switch (e.key) {
//         case "Escape":
//           if (isCommentModalOpen) {
//             closeCommentModal();
//           } else {
//             closeModal();
//           }
//           break;
//         case "ArrowLeft":
//           if (isModalOpen) {
//             e.preventDefault();
//             goToPrevious();
//           }
//           break;
//         case "ArrowRight":
//           if (isModalOpen) {
//             e.preventDefault();
//             goToNext();
//           }
//           break;
//         default:
//           break;
//       }
//     };

//     document.addEventListener("keydown", handleKeyDown);
//     return () => document.removeEventListener("keydown", handleKeyDown);
//   }, [isModalOpen, isCommentModalOpen]);

//   // Cleanup effect for body overflow
//   useEffect(() => {
//     return () => {
//       document.body.style.overflow = "unset";
//     };
//   }, []);

//   // Route change cleanup effect
//   useEffect(() => {
//     const handleRouteChange = () => {
//       document.body.style.overflow = "unset";
//     };
//     router.events?.on("routeChangeStart", handleRouteChange);
//     return () => {
//       router.events?.off("routeChangeStart", handleRouteChange);
//     };
//   }, [router]);

//   // Image preloading effect
//   useEffect(() => {
//     if (isModalOpen && selectedImageIndex !== null) {
//       const nextIndex = (selectedImageIndex + 1) % sortedPhotos.length;
//       const prevIndex =
//         (selectedImageIndex - 1 + sortedPhotos.length) % sortedPhotos.length;
//       preloadImage(sortedPhotos[nextIndex].imageUrl);
//       preloadImage(sortedPhotos[prevIndex].imageUrl);
//     }
//   }, [selectedImageIndex, isModalOpen, sortedPhotos]);

//   // Swipe detection constants
//   const minSwipeDistance = 50;

//   // Touch handlers for swipe functionality
//   const onTouchStart = (e) => {
//     setTouchEnd(null);
//     setTouchStart(e.targetTouches[0].clientX);
//   };

//   const onTouchMove = (e) => {
//     setTouchEnd(e.targetTouches[0].clientX);
//   };

//   const onTouchEnd = () => {
//     if (!touchStart || !touchEnd) return;

//     const distance = touchStart - touchEnd;
//     const isLeftSwipe = distance > minSwipeDistance;
//     const isRightSwipe = distance < -minSwipeDistance;

//     if (isLeftSwipe) {
//       goToNext();
//     } else if (isRightSwipe) {
//       goToPrevious();
//     }

//     // Reset touch values immediately after handling
//     setTouchStart(null);
//     setTouchEnd(null);
//   };

//   const toggleLanguage = (lang) => {
//     setLanguage(lang);
//   };

//   // Memoized callback to prevent re-renders
//   const openModal = React.useCallback((index) => {
//     setSelectedImageIndex(index);
//     setIsModalOpen(true);
//     document.body.style.overflow = "hidden";
//   }, []);

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedImageIndex(null);
//     document.body.style.overflow = "unset";
//     setTouchStart(null);
//     setTouchEnd(null);
//   };

//   const goToPrevious = () => {
//     setSelectedImageIndex((prev) =>
//       prev === 0 ? sortedPhotos.length - 1 : prev - 1
//     );
//     // Clear touch values to prevent interaction conflicts
//     setTouchStart(null);
//     setTouchEnd(null);
//   };

//   const goToNext = () => {
//     setSelectedImageIndex((prev) =>
//       prev === sortedPhotos.length - 1 ? 0 : prev + 1
//     );
//     // Clear touch values to prevent interaction conflicts
//     setTouchStart(null);
//     setTouchEnd(null);
//   };

//   // Comment system functions
//  const closeCommentModal = () => {
//   setIsCommentModalAnimating(false);
//   setTimeout(() => {
//     setIsCommentModalOpen(false);
//     setSelectedPhotoForComment(null);
//     setCommentUsername("");
//     setCommentText("");
//     document.body.style.overflow = "unset";
//   }, 300);
// };

// // Update the openCommentModal function:
// const openCommentModal = React.useCallback((photoIndex, e) => {
//   e.stopPropagation();
//   setSelectedPhotoForComment(photoIndex);
//   setIsCommentModalOpen(true);
//   document.body.style.overflow = "hidden";
//   // Add animation delay
//   setTimeout(() => {
//     setIsCommentModalAnimating(true);
//   }, 10);
// }, []);

// // Update the submitComment function to reset modal animation:
// const submitComment = async (e) => {
//   e.preventDefault();
//   setLoading(true);

//   if (!commentUsername.trim() || !commentText.trim()) {
//     setLoading(false);
//     return;
//   }

//   const photoUid = sortedPhotos[selectedPhotoForComment].uid;
//   const photoName = sortedPhotos[selectedPhotoForComment].name;

//   const newComment = {
//     id: Date.now(),
//     username: commentUsername.trim(),
//     comment: commentText.trim(),
//     timestamp: new Date().toISOString(),
//     photoName: photoName,
//     uid: photoUid,
//     isApproved: false,
//   };

//   try {
//     const response = await axios.post(
//       "https://submitcomment-fahifz22ha-uc.a.run.app",
//       newComment
//     );

//     if (response.status === 200) {
//       console.log("Comment submitted successfully:", response.data);
//       await fetchAllComments();
//       setLoading(false);
//       // Only clear comment text, keep username and modal open
//       setCommentText("");
//     } else {
//       console.log("Unexpected response status:", response.status);
//       setLoading(false);
//     }
//   } catch (error) {
//     console.log("Error submitting comment:", error);
//     setLoading(false);
//   }
// };

// // 4. Update the getCommentsCount function to use uid as unified key
// const getCommentsCount = React.useCallback(
//   (photoIndex) => {
//     const photoUid = sortedPhotos[photoIndex].uid;
//     return comments[photoUid]?.length || 0;
//   },
//   [comments, sortedPhotos]
// );

//   function timeAgo(dateString) {
//   const now = new Date();
//   const past = new Date(dateString);
//   const diff = Math.floor((now - past) / 1000);

//   if (diff < 60) return 'just now';
//   if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
//   if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
//   if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
//   if (diff < 2419200) return `${Math.floor(diff / 604800)}w ago`;

//   return past.toLocaleDateString();
// }

//   return (
//     <div
//       className={`min-h-screen max-w-7xl bg-gray-50 transition-opacity duration-1000 ${
//         language === "hindi" ? "font-Teko" : "font-Anek"
//       } ${isVisible ? "opacity-100" : "opacity-0"}`}
//     >
//       {/* Header */}
//       <Header />
//       <header className="bg-transparent backdrop-blur-lg px-4 sticky top-0 z-50 shadow-sm border-b border-gray-200">
//         <div className="max-w-7xl mx-auto px-2 py-2 sm:px-4 lg:px-8">
//           <div className="flex justify-between flex-col gap-2 sm:flex-row items-center py-2">
//             <div
//               className={`${
//                 language === "hindi" ? "font-Teko" : "font-notoGujarati"
//               }`}
//             >
//               <h1 className="text-2xl sm:text-2xl font-bold text-gray-900">
//                 {language === "hindi"
//                   ? "शासनभक्ति की अंजलि"
//                   : "શાસનભક્તિની અંજલિ"}
//               </h1>
//               <p className="font-karma text-sm sm:text-base font-bold text-gray-600">
//                 {language === "hindi"
//                   ? "अध्यात्म परिवार द्वारा किए जा रहे शासन सेवा - सुरक्षा के कार्यों की झलक"
//                   : "અધ્યાત્મ પરિવાર દ્વારા કરવામાં આવી રહેલા શાસન - સુરક્ષાના કાર્યોની એક ઝલક"}
//               </p>
//             </div>

//             {/* Controls */}
//             <div className="flex items-center gap-3">
//               {/* WhatsApp Group Link */}
//               <a
//                 href={whatsappLinks[language]}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-full transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
//               >
//                 <FaWhatsapp className="w-4 h-4" />
//                 <span className="text-sm font-medium">
//                   {language === "hindi" ? "व्हाट्सऐप ग्रुप" : "વોટ્સએપ ગ્રુપ"}
//                 </span>
//               </a>

//               {/* Language Toggle */}
//               <div className="relative flex items-center bg-gray-300 rounded-3xl p-1 shadow-inner">
//                 <button
//                   onClick={() => toggleLanguage("hindi")}
//                   className={`relative px-4 py-2 rounded-3xl text-sm font-medium font-Teko transition-all duration-300 ease-in-out transform ${
//                     language === "hindi"
//                       ? "bg-black text-white shadow-lg scale-105"
//                       : "text-gray-600"
//                   }`}
//                 >
//                   हिन्दी
//                 </button>
//                 <button
//                   onClick={() => toggleLanguage("gujarati")}
//                   className={`relative px-4 py-2 rounded-3xl font-notoGujarati text-sm font-medium transition-all duration-300 ease-in-out transform ${
//                     language === "gujarati"
//                       ? "bg-black text-white shadow-lg scale-105"
//                       : "text-gray-600"
//                   }`}
//                 >
//                   ગુજરાતી
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Photo Grid */}
//       <main className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-4 py-2 sm:py-4">
//         <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:gap-4 gap-2">
//           {sortedPhotos.map((photo, index) => (
//             <PhotoCard
//               key={photo.imageUrl}
//               photo={photo}
//               index={index}
//               hasAnimated={hasAnimated}
//               onOpenModal={openModal}
//               onOpenCommentModal={openCommentModal}
//               getCommentsCount={getCommentsCount}
//             />
//           ))}
//         </div>

//         {/* Empty State */}
//         {sortedPhotos.length === 0 && (
//           <div className="text-center py-12">
//             <div className="text-gray-400 text-lg">
//               {language === "hindi"
//                 ? "कोई फोटो उपलब्ध नहीं है"
//                 : "કોઈ ફોટો ઉપલબ્ધ નથી"}
//             </div>
//           </div>
//         )}
//       </main>

//       {/* Modal Gallery */}
//      {isModalOpen && selectedImageIndex !== null && (
//   <div
//     className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
//     onClick={closeModal}
//   >
//     <div
//       className="relative max-w-4xl max-h-full"
//       ref={modalRef}
//       onTouchStart={onTouchStart}
//       onTouchMove={onTouchMove}
//       onTouchEnd={onTouchEnd}
//     >
//       {/* Close Button */}
//       <button
//         onClick={closeModal}
//         className="absolute top-2 p-2 bg-slate-800/50 rounded-full right-4 text-white hover:text-gray-300 transition-colors duration-200 z-10"
//       >
//         <FaTimes />
//       </button>

//       {/* Navigation Buttons */}
//       <button
//         onClick={(e) => {
//           e.stopPropagation();
//           goToPrevious();
//         }}
//         className="absolute bg-slate-800/50 p-3 rounded-full sm:-left-12 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors duration-200 z-10"
//         style={{ fontSize: "24px" }}
//       >
//         <FaChevronLeft />
//       </button>

//       <button
//         onClick={(e) => {
//           e.stopPropagation();
//           goToNext();
//         }}
//         className="absolute bg-slate-800/50 p-3 rounded-full right-0 sm:-right-12 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors duration-200 z-10"
//         style={{ fontSize: "24px" }}
//       >
//         <FaChevronRight />
//       </button>

//       {/* Comment button in full screen */}
//       <button
//         onClick={(e) => {
//           e.stopPropagation();
//           openCommentModal(selectedImageIndex, e);
//         }}
//         className="absolute bottom-4 left-4 bg-white hover:bg-white text-golden/90 hover:text-golden/100 p-3 rounded-full shadow-lg transition-all duration-200 flex items-center gap-2 z-10"
//       >
//         <FaComment className="w-6 h-6" />
//         {/* {getCommentsCount(selectedImageIndex) > 0 && (
//           <span className="text-sm font-medium bg-golden text-white px-2 py-1 rounded-full min-w-[24px] h-6 flex items-center justify-center">
//             {getCommentsCount(selectedImageIndex)}
//           </span>
//         )} */}
//       </button>

//       {/* Image Container */}
//       <div
//         className="bg-transparent rounded-sm shadow-2xl overflow-hidden select-none"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <img
//           src={sortedPhotos[selectedImageIndex].imageUrl}
//           alt={sortedPhotos[selectedImageIndex].name}
//           className="w-full h-auto max-h-[95vh] object-contain"
//           style={{ aspectRatio: "180/297" }}
//           draggable={false}
//         />
//       </div>
//     </div>
//   </div>
// )}
//       {/* Comment Modal */}
//       {isCommentModalOpen && selectedPhotoForComment !== null && (
//         <div className="">
//         <div className="fixed inset-0 z-50">
//           {/* Backdrop */}
//           <div
//             className={`absolute inset-0 bg-black transition-opacity duration-300 ${
//               isCommentModalAnimating ? 'bg-opacity-50' : 'bg-opacity-0'
//             }`}
//             onClick={closeCommentModal}
//           />

//           {/* Modal Content - Fixed Height Structure */}
//           <div
//             ref={commentModalRef}
//             className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${
//               isCommentModalAnimating ? 'translate-y-0' : 'translate-y-full'
//             }`}
//             style={{ height: commentModalHeight, maxHeight: '85vh' }}
//             onClick={(e) => e.stopPropagation()}
//           >
//             {/* Drag Handle */}
//             <div className="flex justify-center pt-3 pb-2 flex-shrink-0">
//               <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
//             </div>

//             {/* Header */}
//             {/* <div className="flex items-center justify-between px-5 py-2 border-b border-gray-100 flex-shrink-0 bg-white">
//               <h3 className={`text-xl font-semibold text-gray-900 ${
//                 language === "hindi" ? "font-Teko" : "font-notoGujarati"
//               }`}>
//                 {language === "hindi" ? "टिप्पणियां" : "ટિપ્પણીઓ"}
//               </h3>
//               <button
//                 onClick={closeCommentModal}
//                 className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
//               >
//                 <FaTimes className="w-5 h-5" />
//               </button>
//             </div> */}

//             {/* Photo Info Bar */}
//             <div className="px-5 py-2 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-gray-100/50 shadow-inner flex-shrink-0 flex items-center justify-between">
//               <div className="flex items-center gap-4">
//                 <div className="relative">
//                   <img
//                     src={sortedPhotos[selectedPhotoForComment].imageUrl}
//                     alt={sortedPhotos[selectedPhotoForComment].name}
//                     className="w-12 h-12 object-cover rounded-xl shadow-md border-2 border-white"
//                   />
//                   <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
//                     <FaComment className="w-3 h-3 text-white" />
//                   </div>
//                 </div>
//                 <div className="flex-1">
//                   <h4 className="font-semibold text-gray-900 text-base">
//                     {sortedPhotos[selectedPhotoForComment].name}
//                   </h4>
//                   <p className="text-sm text-gray-600 flex items-center gap-1">
//                     <span>{getCommentsCount(selectedPhotoForComment)}</span>
//                     <span>{language === "hindi" ? "टिप्पणियां" : "ટિપ્પણીઓ"}</span>
//                     {getCommentsCount(selectedPhotoForComment) > 0 && (
//                       <span className="w-1 h-1 bg-gray-400 rounded-full ml-1"></span>
//                     )}
//                   </p>
//                 </div>
//               </div>
//                             <button
//                 onClick={closeCommentModal}
//                 className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
//               >
//                 <FaTimes className="w-5 h-5" />
//               </button>
//             </div>

//             {/* Comments List - Flexible Height */}
//             <div className="flex-1 overflow-y-auto px-5 py-3 min-h-0">
//               {commentsLoading ? (
//   <div className="flex flex-col items-center justify-center h-40">
//     <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-3">
//       <LuLoaderCircle className="w-6 h-6 animate-spin text-blue-500" />
//     </div>
//     <p className="text-sm text-gray-500">
//       {language === "hindi" ? "टिप्पणियां लोड हो रही हैं..." : "ટિપ્પણીઓ લોડ થઈ રહી છે..."}
//     </p>
//   </div>
// ) : comments[sortedPhotos[selectedPhotoForComment].uid]?.length > 0 ? (
//   <div className="space-y-4 pb-6">
//     {comments[sortedPhotos[selectedPhotoForComment].uid].map((comment, index) => (
//       <div key={comment.id} className="flex items-start gap-3 group animate-in slide-in-from-bottom-2 duration-300" style={{ animationDelay: `${index * 50}ms` }}>
//         {/* Avatar */}
//         <div className="w-9 h-9 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
//           <FaUser className="w-4 h-4 text-white" />
//         </div>

//         {/* Comment Content */}
//         <div className="flex-1 max-w-[calc(100%-4rem)]">
//           <div className="bg-gray-50 rounded-2xl rounded-tl-lg px-4 py-3 group-hover:bg-gray-100 transition-all duration-200 shadow-sm">
//             <div className="flex items-center gap-2 mb-2">
//               <span className="font-semibold text-sm text-gray-900">
//                 {comment.username}
//               </span>
//               <span className="text-xs text-gray-400">•</span>
//               <span className="text-xs text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full">
//                 {timeAgo(comment.timestamp)}
//               </span>
//             </div>
//             <p className="text-sm text-gray-800 break-words">
//               {comment.comment}
//             </p>
//           </div>
//         </div>
//       </div>
//     ))}
//   </div>
// ) : (
//   <div className="flex flex-col items-center justify-center h-40">
//     <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-4 shadow-inner">
//       <FaComment className="w-7 h-7 text-gray-400" />
//     </div>
//     <p className="text-base font-medium text-gray-600 text-center">
//       {language === "hindi" ? "अभी तक कोई टिप्पणी नहीं" : "અત્યાર સુધી કોઈ ટિપ્પણી નથી"}
//     </p>
//     <p className="text-sm text-gray-400 text-center mt-1">
//       {language === "hindi" ? "पहली टिप्पणी जोड़ें" : "પ્રથમ ટિપ્પણી ઉમેરો"}
//     </p>
//   </div>
// )}
//             </div>

//             {/* Comment Input - Fixed at Bottom */}
//             <div className="border-t border-gray-200  shadow-inner bg-white px-5 py-4 flex-shrink-0 ">
//               <form onSubmit={submitComment} className="space-y-3">
//                 {/* Username input */}
//                 <div className="flex items-center gap-3">
//                   <div className="w-9 h-9 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
//                     <FaUser className="w-4 h-4 text-white" />
//                   </div>
//                   <input
//                     type="text"
//                     value={commentUsername}
//                     onChange={(e) => setCommentUsername(e.target.value)}
//                     placeholder={language === "hindi" ? "आपका नाम..." : "તમારુ નામ..."}
//                     className="flex-1 px-4 py-2.5 text-sm border border-gray-200 rounded-full focus:outline-none focus:ring-1 focus:ring-golden focus:border-transparent bg-gray-50 hover:bg-white transition-colors"
//                     required
//                   />
//                 </div>

//                 {/* Comment input */}
//                 <div className="flex items-center gap-3">
//                   <div className="w-9 h-9 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
//                     <FaComment className="w-4 h-4 text-white" />
//                   </div>
//                   <div className="flex-1 flex items-center gap-3 bg-gray-50 rounded-2xl px-4 py-2.5 border border-gray-200 hover:bg-white focus-within:bg-white focus-within:ring-1 focus-within:ring-golden focus-within:border-transparent transition-all">
//                     <textarea
//                       value={commentText}
//                       onChange={(e) => setCommentText(e.target.value)}
//                       placeholder={language === "hindi" ? `${sortedPhotos[selectedPhotoForComment].name} पर टिप्पणी करे...` : `${sortedPhotos[selectedPhotoForComment].name} પર ટિપ્પણી કરે...`}
//                       rows={2}
//                       className="flex-1 bg-transparent text-sm resize-none focus:outline-none placeholder-gray-400"
//                       style={{
//                         // minHeight: '22px',
//                         maxHeight: '32px',
//                         overflow: 'hidden'
//                       }}
//                       onInput={(e) => {
//                         e.target.style.height = 'auto';
//                         e.target.style.height = e.target.scrollHeight + 'px';
//                       }}
//                       required
//                     />
//                     <button
//                       type="submit"
//                       disabled={!commentUsername.trim() || !commentText.trim() || loading}
//                       className="p-2.5 bg-golden  hover:bg-golden/80 disabled:from-gray-300 disabled:to-gray-400 rounded-full transition-all duration-200 shadow-sm hover:shadow-md disabled:shadow-none transform hover:scale-105 disabled:scale-100"
//                     >
//                       {loading ? (
//                         <LuLoaderCircle className="w-4 h-4 animate-spin text-white" />
//                       ) : (
//                         <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
//                           <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
//                         </svg>
//                       )}
//                     </button>
//                   </div>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//         </div>
//       )}

//       <Footer />
//     </div>
//   );
// };

// export default PhotoGallery;
