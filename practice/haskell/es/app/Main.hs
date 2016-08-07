{-# LANGUAGE RecordWildCards #-}
module Main where

data Event =
  EngineStarted Location
  | EngineStopped Location
  | LandmarkHit Location

data Command =
  StartEngine Location
  | StopEngine Location
  | HitLandmark Location

data Location =
  Home
  | Work
  | GasStation
  | Tunnel String
  | Street String
  | Uninteresting

type DateTime = String

data State =
  State {
    tripFromHome :: Maybe DateTime
  , tripFromWork :: Maybe DateTime
  , minuteTripTimesToWork :: [Float]
  , minuteTripTimesToHome :: [Float]
  }

initialState :: State
initialState = State {
    tripFromHome = Nothing
  , tripFromWork = Nothing
  , minuteTripTimesToWork = []
  , minuteTripTimesToHome = []
  }

affect :: State -> Event -> State
affect state (EngineStarted Home) = state { tripFromHome = Just "some-time" }
affect state (EngineStarted Work) = state { tripFromWork = Just "some-time" }
affect state@(State { tripFromHome = Just st, .. }) (EngineStopped Work) = state -- calculate diff
affect state _ = state

applyCommand :: State -> Command -> [Event]
applyCommand state command =
  case command of
    StartEngine loc -> [EngineStarted loc]
    StopEngine loc -> [EngineStopped loc]
    HitLandmark loc -> [LandmarkHit loc]

main :: IO ()
main = putStrLn "it compiles!"
