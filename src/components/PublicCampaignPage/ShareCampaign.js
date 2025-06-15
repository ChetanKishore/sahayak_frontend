import React from 'react';
import {
  FaWhatsapp,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaEnvelope,
  FaCopy,
  FaShareAlt
} from 'react-icons/fa';
import decorativeSVG from '../../assets/Health professional team-bro.svg';

const ShareCampaign = () => {
  const shareUrl = window.location.href;
  const shareTitle = 'Support this important campaign!';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    alert('Link copied to clipboard!');
  };

  const handleWebShare = () => {
    if (navigator.share) {
      navigator.share({
        title: shareTitle,
        url: shareUrl,
      });
    } else {
      alert('Web Share not supported on this device.');
    }
  };

  const shareButtons = [
    {
      icon: <FaWhatsapp />,
      label: 'WhatsApp',
      bg: 'bg-[#25D366]',
      hover: 'hover:bg-[#1DA955]',
      url: `https://wa.me/?text=${encodeURIComponent(shareTitle)}%20${encodeURIComponent(shareUrl)}`
    },
    {
      icon: <FaFacebookF />,
      label: 'Facebook',
      bg: 'bg-[#1877F2]',
      hover: 'hover:bg-[#155ec1]',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    },
    {
      icon: <FaTwitter />,
      label: 'Twitter',
      bg: 'bg-[#1DA1F2]',
      hover: 'hover:bg-[#0d8ddb]',
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`
    },
    {
      icon: <FaLinkedinIn />,
      label: 'LinkedIn',
      bg: 'bg-[#0A66C2]',
      hover: 'hover:bg-[#084a91]',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
    },
    {
      icon: <FaEnvelope />,
      label: 'Email',
      bg: 'bg-[#EA4335]',
      hover: 'hover:bg-[#d7372c]',
      url: `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(shareUrl)}`
    },
    {
      icon: <FaCopy />,
      label: 'Copy Link',
      bg: 'bg-gray-600',
      hover: 'hover:bg-gray-700',
      action: handleCopyLink
    },
    {
      icon: <FaShareAlt />,
      label: 'More',
      bg: 'bg-purple-600',
      hover: 'hover:bg-purple-700',
      action: handleWebShare
    }
  ];

  return (
    <div className="relative bg-gradient-to-br from-[#f0f4f8] to-[#e2e8f0] p-8 rounded-2xl shadow-xl mt-10 overflow-hidden">
      {/* Decorative SVG Corner */}
      <img
        src={decorativeSVG}
        alt="Decorative corner"
        className="absolute -top-4 -left-4 w-32 opacity-20 rotate-12"
      />
      <img
        src={decorativeSVG}
        alt="Decorative corner"
        className="absolute -bottom-4 -right-4 w-32 opacity-20 -rotate-12"
      />

      <div className="relative z-10 text-center space-y-4">
        <h3 className="text-2xl font-bold text-[#003198] mb-2">
          🌟 Share & Support 🌟
        </h3>
        <p className="text-gray-700 max-w-xl mx-auto mb-6">
          Spread the word and help us reach more people who care. Your share can make a real impact.
        </p>

        {/* Grid of share buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 justify-items-center">
          {shareButtons.map((btn, idx) => (
            <button
              key={idx}
              onClick={() => btn.url ? window.open(btn.url, '_blank') : btn.action()}
              className={`flex flex-col items-center justify-center ${btn.bg} ${btn.hover} p-3 rounded-xl shadow hover:shadow-md transform hover:-translate-y-1 transition-all w-28 h-28`}
              title={`Share via ${btn.label}`}
            >
              <div className="text-2xl">{btn.icon}</div>
              <span className="mt-2 text-sm font-semibold">{btn.label}</span>
            </button>
          ))}
        </div>

        <p className="mt-4 text-sm text-gray-500">
          Thank you for helping us reach more kind hearts!
        </p>
      </div>
    </div>
  );
};

export default ShareCampaign;
