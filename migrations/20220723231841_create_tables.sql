
-- users
CREATE TABLE users (
  id UUID REFERENCES auth.users NOT NULL,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  username TEXT UNIQUE,

  account_type TEXT NOT NULL,

  bio TEXT,
  avatar_url TEXT,
  website TEXT,
  email TEXT,
  twitter_handle TEXT,
  instagram_handle TEXT,
  tiktok_handle TEXT,
  soundcloud_handle TEXT,
  spotify_handle TEXT,
  wallet TEXT,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  PRIMARY KEY (id),
  UNIQUE(username),
  CONSTRAINT username_length CHECK (CHAR_LENGTH(username) >= 3)
);
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone."
  ON users FOR SELECT
  USING ( true );

CREATE POLICY "Users can insert their own profile."
  ON users FOR INSERT
  WITH CHECK ( auth.uid() = id );

CREATE POLICY "Users can update own profile."
  ON users FOR UPDATE
  USING ( auth.uid() = id );

-- badges
CREATE TABLE badges (
    id UUID NOT NULL,
    sender_id UUID REFERENCES users NOT NULL,
    receiver_id UUID REFERENCES users NOT NULL,
    badge_url TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    PRIMARY KEY (id)
);

ALTER TABLE badges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public badges are viewable by everyone."
  ON badges FOR SELECT
  USING ( true );

CREATE POLICY "Business users can send badges."
  ON badges FOR INSERT
  WITH CHECK ( auth.uid() == sender_id AND account_type == 'business' );

-- Set up Realtime
BEGIN;
  DROP publication IF EXISTS supabase_realtime;
  CREATE publication supabase_realtime;
COMMIT;
ALTER publication supabase_realtime ADD TABLE users;
ALTER publication supabase_realtime ADD TABLE badges;

-- Set up Storage

-- Avatars
INSERT INTO storage.buckets (id, name)
VALUES ('avatars', 'avatars');

CREATE POLICY "Avatar images are publicly accessible."
  ON storage.objects FOR SELECT
  USING ( bucket_id = 'avatars' );

CREATE POLICY "Anyone can upload an avatar."
  ON storage.objects FOR INSERT
  WITH CHECK ( bucket_id = 'avatars' );


-- Badges
INSERT INTO storage.buckets (id, name)
VALUES ('badges', 'badges');

CREATE POLICY "Badge images are publicly accessible."
  ON storage.objects FOR SELECT
  USING ( bucket_id = 'badges' );

CREATE POLICY "Anyone can upload a badge"
  ON storage.objects FOR INSERT
  WITH CHECK ( bucket_id = 'badges' );