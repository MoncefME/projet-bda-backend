export type ActivityRow = [
  number, // id
  number, // athlete_id
  string, // name
  number, // distance
  number, // moving_time
  number, // elapsed_time
  number, // total_elevation_gain
  string, // sport_type
  string, // start_date
  string, // start_date_local
  string, // timezone
  number, // utc_offset
  number, // achievement_count
  number, // kudos_count
  number, // comment_count
  number, // athlete_count
  boolean, // trainer
  boolean, // commute
  boolean, // manual
  boolean, // private
  string, // visibility
  number, // average_speed
  number, // max_speed
  number | null, // average_cadence
  number | null, // average_heartrate
  number | null, // max_heartrate
  boolean, // display_hide_heartrate_option
  number, // elev_high
  number, // elev_low
  number, // pr_count
  number, // total_photo_count
  boolean, // has_kudoed
  string | null, // description
  number | null, // calories
  boolean // has_heartrate
];

export type Activity = {
  id: number;
  athlete_id: number;
  name: string;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  total_elevation_gain: number;
  sport_type: string;
  start_date: string;
  start_date_local: string;
  timezone: string;
  utc_offset: number;
  achievement_count: number;
  kudos_count: number;
  comment_count: number;
  athlete_count: number;
  trainer: boolean;
  commute: boolean;
  manual: boolean;
  private: boolean;
  visibility: string;
  average_speed: number;
  max_speed: number;
  average_cadence?: number | null;
  average_heartrate?: number | null;
  max_heartrate?: number | null;
  display_hide_heartrate_option: boolean;
  elev_high: number;
  elev_low: number;
  pr_count: number;
  total_photo_count: number;
  has_kudoed: boolean;
  description?: string | null;
  calories?: number | null;
  has_heartrate: boolean;
};
