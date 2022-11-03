import { Grid, Skeleton } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import NewPostForm from "./NewPostForm";
import ProfileAbout from "./ProfileAbout";
import ProfileCounter from "./ProfileCounter";
import ProfileSocial from "./ProfileSocial";
import SingleProfilePost from "./SingleProfilePost";
import getProfile from "@/api/profile/getProfile";
import IProfile from "@/types/interfaces/profile";

const ProfileTab = () => {
  const {
    data: profile,
    isLoading,
    isError,
  } = useQuery<IProfile>(["profile"], getProfile);

  if (isLoading) {
    return (
      <Grid container spacing={24} mt={24}>
        <Grid
          item
          xs={12}
          md={4}
          display="flex"
          flexDirection="column"
          gap={24}
        >
          <Skeleton variant="rounded" height={106} />
          <Skeleton variant="rounded" height={316} />
          <Skeleton variant="rounded" height={328} />
        </Grid>
        <Grid
          item
          xs={12}
          md={8}
          display="flex"
          flexDirection="column"
          gap={24}
        >
          <Skeleton variant="rounded" height={234} />
          <Skeleton variant="rounded" height={500} />
        </Grid>
      </Grid>
    );
  }

  if (isError) {
    return <div>Something went wrong!</div>;
  }

  return (
    <Grid container spacing={24} mt={24}>
      <Grid item xs={12} md={4} display="flex" flexDirection="column" gap={24}>
        <ProfileCounter
          follower={profile.followersCount}
          following={profile.followingsCount}
        />
        <ProfileAbout
          about={{
            bio: profile.bio,
            location: profile.location,
            email: profile.email,
            resume: profile.resume,
          }}
        />
        <ProfileSocial social={profile.social} />
      </Grid>
      <Grid item xs={12} md={8} display="flex" flexDirection="column" gap={24}>
        <NewPostForm />
        {profile.posts.map((post) => (
          <SingleProfilePost key={post.id} post={post} />
        ))}
      </Grid>
    </Grid>
  );
};

export default ProfileTab;
