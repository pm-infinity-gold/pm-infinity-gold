interface UserProfile {

  name?: string;

  phone?: string;

  address?: string;

  city?: string;

  pincode?: string;
}

export function getProfileCompletion(
  profile: UserProfile
) {

  const fields = [
    profile.name,
    profile.phone,
    profile.address,
    profile.city,
    profile.pincode,
  ];

  const completed =
    fields.filter(Boolean).length;

  const percentage =
    Math.floor(
      (completed / fields.length) * 100
    );

  return {

    percentage,

    completed:
      percentage === 100,
  };
}